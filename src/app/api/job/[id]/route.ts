import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, {params}:{
    params:{
        id: string;
    }
}){
    const id = params.id;

    try{
        const job = await db.openings.findUnique({
            where:{
                id:id
            },
            include:{
                company: true,
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

export async function DELETE(req: NextRequest, {params}){
    try{
        const jobId = params.id;
        const res = await db.openings.delete({
            where:{
                id: jobId,
            }
        });
        return NextResponse.json({
            success: true,
            message: "Deleted successfully!"
        })
    }catch(error){
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

export async function POST(req: NextRequest, {params}){
    const jobId = params.id;
    const body = await req.json();
    try{
        const res = await db.openings.update({
            where:{
                id: jobId,
            },
            data: {
                title: body.title,
                description: body.description,
                location: body.location,
                salary: body.salary,
                job_type: body.job_type
            }
        })
    }catch(error){
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}