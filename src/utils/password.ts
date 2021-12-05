import bcrypt from 'bcrypt';
const saltRouds = 10;

export async function hashPass(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        bcrypt.hash(password, saltRouds, (err, encryptedPass) => {
            if(err) return reject(err)
            return resolve(encryptedPass)
        })
    })    
}

export async function matchPass(hash: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password, hash, (err, same) => {
            if(err) return reject(err)
            return resolve(same)
        })
    })
}