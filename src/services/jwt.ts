//@ts-nocheck
import jwt from 'jsonwebtoken'

export function createToken(data){
    const token = jwt.sign(data, process.env.JWT_SECRET);
    return token;
}

export function verifytoken(token){
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        return data;
    }catch(error){
        return null;
    }
}