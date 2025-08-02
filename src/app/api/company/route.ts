import db from "@/services/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
            const userCookies= await cookies();
        const email = userCookies.get("token")?.value;

        if(!email){
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            })
        }
        const user = await db.user.findUnique({
            where:{
                email: email
            },
            omit:{
                password: true
            }
        })
    const body = await req.json();
}