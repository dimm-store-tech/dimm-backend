import Role from '../models/Role.js';
import User from '../models/User.js';
import {
  USER_ADMI,
  PASSWORD_ADMI,
  NAME_ADMI,    
  PATERNAL_ADMI ,
  MATERNAL_ADMI,    
  DNI_ADMI     
} from '../config.js';

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if(count > 0) return;
    await Promise.all([
      new Role({ name: 'Administrador'}).save(),
      new Role({name: 'Seguridad'}).save(),
      new Role({name: 'Sala'}).save(),
      new Role({name: 'Cliente'}).save()
    ])
  } catch (error) {
    console.log(error)
  }
}

const createAdmin = async () => {
  const userFound = await User.findOne({user: USER_ADMI});
  if(userFound) return;

  const roles = await Role.find({name:{$in:["Administrador","Seguridad","Sala","Cliente"]}})
  const rol = await Role.findOne({name:"Administrador"})
  const newUser = await User({
    user: USER_ADMI,
    password: PASSWORD_ADMI,
    name : NAME_ADMI,
    paternal_surname: PATERNAL_ADMI,
    maternal_surname : MATERNAL_ADMI, 
    dni: DNI_ADMI,
    permissions:roles.map((role) => role._id),
    role:rol._id
  });
  await newUser.save();
  console.log(`Usuario administrador creado => ${newUser.user}`)
}

export default async function createCredentials() {
  await createRoles();
  await createAdmin();
}