import { getRepository } from "typeorm";
import { User } from "../models/user";

interface info{
    username: string
    email: string
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

    try {
        const repo = getRepository(User)
        const newUser = await repo.save(new User(
            userInfo.username,
            userInfo.email
        )) 
        return newUser       
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

        const updatedUser = await repo.save(user);
        return updatedUser;

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