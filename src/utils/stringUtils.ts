import { User } from "../models/user";

export async function sanitization(user: User) {
    if(user.password) delete user.password
    return user
}