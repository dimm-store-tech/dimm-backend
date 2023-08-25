import Role from "../../models/Role.js";
import User from "../../models/User.js";

export const createUser = async (req, res) => {
  try {
    const {
      user,
      password,
      name,
      picture,
      paternal_surname,
      maternal_surname,
      dni,
      role,
      permissions,
      phone,
    } = req.body;
    const userFound = await User.findOne({ user });
    if (userFound) return res.status(400).json(["El usuario ya existe"]);

    const newUser = new User({
      user,
      password,
      name,
      picture,
      paternal_surname,
      maternal_surname,
      dni,
      phone,
    });

    // checking for role
    if (role) {
      const foundRole = await Role.findOne({ name: { $in: role } });
      newUser.role = foundRole._id;
    }
    // checking for permissions
    if (permissions) {
      const foundPermission = await Role.find({ name: { $in: permissions } });
      newUser.permissions = foundPermission.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "Cliente" });
      newUser.permissions = [role._id];
    }

    await newUser.save();

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
    try {
        return await User.find({}).populate(['role','permissions']) 
    } catch (error) {
        return new Error('Error al obtener usuarios')
    }
}

