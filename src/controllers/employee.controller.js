import mongoose from 'mongoose'
import {createUser, getUsers} from '../controllers/auth/User.controller.js'
import Employee from '../models/Employee.js'
export const createEmployee = async (req,res) => {
    const {address,agge} = req.body
    const newUser = await createUser(req,res)
    const newEmployee = await new Employee({
        address,
        agge,
        user : newUser._id
    }).save()
    res.json({newUser,newEmployee})
} 

export const getEmployee = async (req,res) => {
    try {
        const {id} = req.params
        console.log(id)
        if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: "Invalid credentials" });
        const employeeFound = await Employee.findOne({_id:id}).populate({
            path: 'user',
            populate: [
                { path: 'role' },
                { path: 'permissions' }
            ]
    });
    
    if (!employeeFound) return res.status(404).json(["El empleado no existe"]);
        
        res.json(employeeFound)
    } catch (error) {
        console.log(error)
    }
}
 
export const getEmployees = async(req,res) => {
    try {
        // const employees = await getUsers()
        const employees = await Employee.find({}).populate({
            path: 'user',
            populate: [
                { path: 'role' },
                { path: 'permissions' }
            ]
        });
        
        res.json(employees)
    } catch (error) {
        console.log(error)
    }
} 
export const deleteEmployee = (req,res) => res.send('deleteEmployee')
export const updateEmployee = (req,res) => res.send('updateEmployee')