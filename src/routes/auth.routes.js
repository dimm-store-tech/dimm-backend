import { Router } from "express";
import {registerController,loginController} from '../controllers/auth/to-access.js'
const router = Router();


router.post('/login',loginController)
router.post('/login',registerController)

export default router