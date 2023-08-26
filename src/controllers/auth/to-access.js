import jwt from 'jsonwebtoken'
import User from "../../models/User.js";
import createCredentials from '../../libs/initialSetup.js'
import {MySecretKey} from '../../config.js'
import { createUser } from './User.controller.js';

export const createCredentialsController = async (req, res) => {
  await createCredentials()
  res.json({message: "Credentials created successfully"})
}
export const loginController = async (req, res) => {
  try {
    const { user, password } = req.body;
    const userFound = await User.findOne({ user }).populate("role");
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword) return res.status(400).json(["Contraseña incorrecta"]);
    
    const token = jwt.sign({ id: userFound._id }, MySecretKey, {
        expiresIn: 86400, // 24 hours
      });

    res.json({ userFound ,token});
  } catch (error) {
    console.log(error);
    return res.status(401).json({message: "Error en el servidor en el login", error});
  }
};

export const registerController = async (req, res) => {
  try {
    const newUser = await createUser(req,res)
    res.json(newUser);
  } catch (error) {
    console.log(error)
  }
};

export const profileController = async (req,res) => {
    try {
        const userFound = await User.findOne({
            _id: req.user.id
        }).populate(['role','permissions'])
        
        res.json(userFound)
      } catch (error) {
        res.status(400).json({messsage:'Error al obtener el usuario', error})
      }
}
