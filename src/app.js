import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors'
import {FRONTEND_URL,API_URL} from './config.js'
const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

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
