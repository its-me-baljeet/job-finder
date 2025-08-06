import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{
    params: {
        id: string,
    }
}){
    const id = params.id;
    try{
        const jobs = await db.openings.findMany({
            where: {
                company_id: id,
            },
            include:{
                company: true,
            }
        });
        return NextResponse.json({
            success: true,
            data: jobs
        });
    }catch(error){
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }
}