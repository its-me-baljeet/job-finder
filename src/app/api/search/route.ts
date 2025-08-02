import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get('q') || "";
    const jt = searchParams.get('jt') || "remote";
    const et = searchParams.get('et') || "fulltime";
    const minSalaryParam = searchParams.get('ms');
    const ms = minSalaryParam ? Number.parseInt(minSalaryParam) : 1000;
    const pageNo=searchParams.get('page')
    const page =pageNo?Number.parseInt(pageNo):1;
    const limit =10;

    try{
        const data = await db.job.findMany({
            // where: {
            //     title: {
            //         contains: q,
            //         mode: "insensitive",
            //     },
            //     job_type: jt,
            //     employment_type: et,
            //     salary: {
            //         gte: ms
            //     }
            // },
            take: limit,
            skip: (page-1)*limit
        });
        return NextResponse.json(
            {
                success: true,
                data: data,
            }
        )
    }catch(error){
        console.log(error);
        return NextResponse.json({
            success: false,
            message: `something went wrong! ${error}`
        })
    }

}