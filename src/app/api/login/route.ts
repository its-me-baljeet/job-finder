//@ts-nocheck
import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json();

    try{
        const user = await db.user.findUnique({
            //@ts-ignore
            where:{
                email: body.email,
            }
        });
        if(user?.password==body?.password){
            const res =NextResponse.json({
                success: true,
                user: user
            })
            res.cookies.set('token', user.email);
            return res;
        }
    }catch(error){
        console.error(error);
    }
    return NextResponse.json({
        success: false,
        message:'Invalid credentials'
    })
}