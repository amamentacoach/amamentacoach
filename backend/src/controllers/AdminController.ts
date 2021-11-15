

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv/config');

class AdminController{

    async auth(req:Request,res:Response){
        const {password} = req.body;
    
        if(password===process.env.ADMIN_PASSWORD){
            const secret = process.env.SECRET
            const token = jwt.sign({id:999999},secret?secret:"segredo",{
                expiresIn:2592000
            })
            res.json({token})
        }else res.sendStatus(401);
    }
    
}

export default AdminController;