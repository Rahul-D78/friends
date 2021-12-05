import { getRepository } from "typeorm";
import { User } from "../models/user";
import { sign } from "../utils/jwt";
import { hashPass, matchPass } from "../utils/password";
import { sanitization } from "../utils/stringUtils";

interface info{
    email: string
    username: string
    password: string
}

interface userLogin {
    email: string
    password: string
}

export async function getAllUsers(): Promise<User[]> {
    try {
        const repo = getRepository(User);
        const user = await repo.find();
        return user;        
    } catch (e) {
        throw e
    }
}

export async function createUser(userInfo: info): Promise<User> {
    
    //validation stage
    if(!userInfo.username) throw new Error('pleae provide a username')
    if(!userInfo.email) throw new Error('please provide email')
    if(!userInfo.password) throw new Error('please provide password')

    try {
        const repo = getRepository(User)
        const newUser = await repo.save(new User(
            userInfo.username,
            userInfo.email,
            await hashPass(userInfo.password)
        )) 
        return await sanitization(newUser)       
    } catch (e) {
        throw e
    }
}

export async function loginUser(data: userLogin): Promise<User> {
    //validation
    if(!data.email) throw new Error('email field is empty')
    if(!data.password) throw new Error('password field is empty')

    try {
        const repo = getRepository(User)
        const user = await repo.findOne({where: {email: data.email}})
        
        if(!user) throw new Error('user with this email does not exists')

        //check if password matches
        const match = await matchPass(user?.password!, data.password)
        if(match == false) throw new Error('password does not match')

        user.token = await sign(user)
        return await sanitization(user)
    } catch (e) {
        throw e
    }
}

export async function updateUser(userInfo: info, name: string): Promise<User | any> {
    
    //validation stage
    if(!userInfo.username) throw new Error('username null')
    if(!userInfo.email) throw new Error('email null')

    try {
        const repo = getRepository(User)
        const user = await repo.findOne(name)
        
        if (!user) throw new Error('no user found');

        (userInfo.username != undefined) ? user.name = userInfo.username : (user.name);
        (userInfo.email != undefined) ? user.email = userInfo.email : (user.email);
        (userInfo.password != undefined) ? user.password = userInfo.password : (user.password);

        const updatedUser = await repo.save(user);
        return await sanitization(updatedUser);

    } catch (e) {
        throw e
    }
}

export async function deleteUser(userInfo: info, name: string): Promise<User> {
    //validation stage
    if(!userInfo.username) throw new Error('name is not provided')

    try {
        const repo = getRepository(User)
        const user = await repo.findOne(name)
        if(!user) throw new Error('user not found')

        const deletedUser = await repo.remove(user)
        return deletedUser; 
    } catch (e) {
        throw e
    }
}