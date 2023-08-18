import jwt from 'jsonwebtoken'
import { MySecretKey } from '../config.js'
export const authRequired = (req,res,next) => {
    // is verified
    const {token} = req.cookies
    if(!token) return res.status(401).json({message:"No token, authorization denied"})
    jwt.verify(token,MySecretKey, (err,user) => {
        if(err) return res.status(401).json({message:"Invalid token"});
            req.user = user
        next()
    })
}