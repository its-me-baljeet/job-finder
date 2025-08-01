import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json();

    console.log(body)

    try{
        const data = await db.job.create({
            data: body
        });
        return NextResponse.json({
            success: true,
        })
    }catch(error){
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }
}