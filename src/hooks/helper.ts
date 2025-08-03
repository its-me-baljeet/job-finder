import db from "@/services/prisma";
import { cookies } from "next/headers";

export async function getUserFromCookies(){
    const userCookies = await cookies();
    const email = userCookies.get('token')?.value;

    if(!email)return null;

    const user = await db.user.findUnique({
        where:{
            email: email
        },
        omit:{
            password: true
        }
    });
    if(!user)return null;
    return user;
}