import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors'
import {FRONTEND_URL,API_URL} from './config.js'
const app = express();

// Settings
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

// Middlewares
app.use(morgan('dev'))
app.use(cors({
    origin: [FRONTEND_URL,'https://dimm-store.netlify.app'], 
    methods: "GET,POST,PUT,DELETE",
    credentials : true //Para poder establecer las cookies
}))
// Rutes
app.use('/api/auth/',authRoutes)


export default app;
