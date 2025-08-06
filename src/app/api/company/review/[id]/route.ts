import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:{
    params: {
        id: string,
    }
}){
    const companyId = params.id;

    try{
        const reviews = await db.review.findMany({
            where:{
                company_id: companyId,
            },
            include: {
                user: true,
            }
        });
        return NextResponse.json({
            success: true,
            data: reviews
        })
    }catch(error){
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        })
    }
}

export async function POST(req: NextRequest, {params}:{
    params: {
        id: string,
    }
}){
    const companyId = params.id;
    try{
        const body = await req.json();
        const res = await db.review.create({
            data: body
        });
        return NextResponse.json({
            success: true,
            data: res
        })
    }catch(error){
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!",
        })
    }

}