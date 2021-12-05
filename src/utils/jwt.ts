import jwt from 'jsonwebtoken'
import { User } from '../models/user'

const secret = 'ThisIsASecret'

export async function sign(user: User):Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign({
            username: user.name,
            email: user.email
        }, secret!, (err: any, encode: any) => {
            if(err) return reject(err)
            return resolve(encode)
        })
    })
}

export async function decode(token: string):Promise<User> {
    return new Promise<User>((resolve, reject) => {
        jwt.verify(token, secret!, (err, decode) => {
            if(err) return reject(err)
            return(decode as User)
        })
    })
}