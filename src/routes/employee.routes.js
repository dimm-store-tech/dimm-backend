import { Router } from "express";
import { authRequired } from "../middlewares/authRequired.js";
import { getEmployee,getEmployees,deleteEmployee,updateEmployee,createEmployee } from "../controllers/employee.controller.js";
const router = Router();


router.get('/',authRequired,getEmployees) 
router.post('/',authRequired,createEmployee)
router.get('/:id',authRequired,getEmployee)
router.delete('/:id',authRequired,deleteEmployee)
router.put('/:id',authRequired,updateEmployee)



export default router