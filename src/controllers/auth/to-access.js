import jwt from 'jsonwebtoken'
import User from "../../models/User.js";
import Role from "../../models/Role.js";
import createCredentials from '../../libs/initialSetup.js'
import {MySecretKey,isDevelopment} from '../../config.js'

export const createCredentialsController = async (req, res) => {
  await createCredentials()
  res.json({message: "Credentials created successfully"})
}
export const loginController = async (req, res) => {
  try {
    const { user, password } = req.body;
    const userFound = await User.findOne({ user }).populate("roles");
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword) return res.status(400).json(["Contraseña incorrecta"]);
    
    const token = jwt.sign({ id: userFound._id }, MySecretKey, {
        expiresIn: 86400, // 24 hours
      });

    req.cookies = token

    res.cookie('token', token, { 
      httpOnly: true,
      secure: !isDevelopment, // Solo se enviará en conexiones HTTPS
      sameSite: 'strict' // Controla cuándo se envía la cookie
    });
    res.json({ userFound, matchPassword ,token});
  } catch (error) {
    console.log(error);
    return res.status(401).json({message: "Error en el servidor en el login", error});
  }
};

export const registerController = async (req, res) => {
  try {
    const {
      user,
      password,
      name,
      picture,
      paternal_surname,
      maternal_surname,
      dni,
      roles,
    } = req.body;

    const userFound = await User.findOne({ user })
    if (userFound) return res.status(400).json(["El usuario ya existe"]);

      
    const newUser = new User({
      user,
      password,
      name,
      picture,
      paternal_surname,
      maternal_surname,
      dni,
    });

    // checking for roles
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "Cliente" });
      newUser.roles = [role._id];
    }

    await newUser.save();

    res.json(newUser);
  } catch (error) {
    console.log(error)
  }
};

export const profileController = async (req,res) => {
    try {
        const userFound = await User.findOne({
            _id: req.user.id
        }).populate('roles')
        
        res.json(userFound)
      } catch (error) {
        res.status(400).json({messsage:'Error al obtener el usuario', error})
      }
}

export const logoutController = async (req,res) => {
    res.cookie('token',"",{
        expires:new Date(0)
    })
    res.sendStatus(200)
}
