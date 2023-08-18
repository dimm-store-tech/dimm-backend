import { Router } from "express";
import {registerController,loginController,logoutController,profileController,createCredentialsController} from '../controllers/auth/to-access.js'
import { authRequired } from "../middlewares/authRequired.js";
const router = Router();


router.get('/create-credentials',createCredentialsController)

router.post('/login',loginController)
router.post('/register',registerController)
router.get('/logout',logoutController)
// Profile
router.get('/profile',authRequired,profileController)


export default router