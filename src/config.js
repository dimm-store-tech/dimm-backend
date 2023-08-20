import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI || 'mongodb://127.0.0.1:27017/wortika';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
export const API_URL = process.env.API_URL_URL || 'http://localhost:4000';
export const MySecretKey = 'dimm@secrect@key';
export const isDevelopment = process.env.NODE_ENV;
// Data Administrator
export const USER_ADMI = process.env.USER_ADMI
export const PASSWORD_ADMI = process.env.PASSWORD_ADMI 
export const NAME_ADMI = process.env.NAME_ADMI
export const PATERNAL_ADMI = process.env.PATERNAL_ADMI
export const MATERNAL_ADMI  = process.env.MATERNAL_ADMI   
export const DNI_ADMI = process.env.DNI_ADMI