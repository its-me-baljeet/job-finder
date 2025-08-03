import { getUserFromCookies } from "@/hooks/helper";
import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{
    params: {
        id: string;
    }
}){
    const id= params.id;
    const company = await db.company.findUnique({
        where:{
            ownerId: id,
        },
        include:{
            owner: true,
        }
    });

    return NextResponse.json({
        success: true,
        data: {
            company
        }
    })
}

export async function DELETE(req:NextRequest, {params}:{params:{id:string}}){
    try{

        const id = params.id;
        const user = await getUserFromCookies();
        // console.log(id)
        console.log(user?.company)
        const company = await db.company.findUnique({
            where:{
                ownerId: id
            }
        })
        if(company?.ownerId == user?.id){
            const res = await db.company.delete({
                where:{
                    ownerId: id
                }
            })
            return NextResponse.json({
                success:true,
                message:`company: ${company?.title} deleted!`
            })
        }
        return NextResponse.json({
            success:false,
            message:`unable to delete company: ${company?.title}`
        })
    }catch(error){
        console.error("something went wrong:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }
}