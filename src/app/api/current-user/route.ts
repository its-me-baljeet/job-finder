import db from "@/services/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    console.log("hi")
    try{
        const userCookies = await cookies();
        const email = userCookies.get("token")?.value;
    
        if(!email){
            return NextResponse.json({
                success: false,
                message: "User not authenticated!"
            })
        }
        const user = await db.user.findUnique({
            where:{
                email: email,
            },
            omit:{
                password: true
            }
        });
        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found!",
            })
        }
        return NextResponse.json({
            success: true,
            user: user
        })
    }catch(error){
        console.error("Something went wrong!", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }
}