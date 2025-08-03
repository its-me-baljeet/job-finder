import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, {params}:{
    params:{
        id: string;
    }
}){
    const id = params.id;

    try{
        const job = await db.job.findUnique({
            where:{
                id:id
            }
        }
        )
        if(job){
            return NextResponse.json({
                success: true,
                data: job,
            })
        }else{
            return NextResponse.json({
                success: false,
                message: "job not found ;-;"
            })
        }
    }catch(error){
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }

}