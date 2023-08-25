import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js';
import employeeRoutes from './routes/employee.routes.js'
import {FRONTEND_URL,API_URL} from './config.js'
const app = express();
// Settings
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Middlewares
app.use(morgan('dev'))
app.use(cors({
    origin: [FRONTEND_URL,'https://dimm-store.netlify.app'], 
    methods: "GET,POST,PUT,DELETE",
    credentials : true //Para poder establecer las cookies
}))
// Rutes
app.use('/api/auth/',authRoutes)
app.use('/api/employee',employeeRoutes)

export default app;
