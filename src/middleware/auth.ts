import { Request, Response, NextFunction } from 'express';
import { decode } from '../utils/jwt';

export async function authByToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('authorization')?.split(' ');
        
    if(!authHeader) return res.status(401).send({
        msg: 'authentication failed'
    })

    if(authHeader[0] != 'Token') return res.status(401).send({
        msg: 'authentication failed token missing' 
    })

    try {
        const token = authHeader[1];
        const user = await decode(token);       
        if(!user) throw new Error('No user found');
        (req as any).user = user;
        
        return next();
    } catch (e) {
        res.status(500).send({
            msg: `Login Failed ${e}`
        })
    }
}