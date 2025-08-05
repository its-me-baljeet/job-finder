import db from "@/services/prisma";
import { Prisma } from "../../../../generated/prisma"; // Import Prisma types
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const q = searchParams.get('q');
        const jt = searchParams.get('jt');
        const et = searchParams.get('et');
        const minSalaryParam = searchParams.get('ms');
        const pageNo = searchParams.get('page');

        const page = pageNo ? Number.parseInt(pageNo) : 1;
        const limit = 10;
        
        // Use a specific Prisma type for our where clause for type safety
        const where: Prisma.OpeningsWhereInput = {};

        // 1. Only add 'title' filter if 'q' parameter exists
        if (q) {
            where.title = {
                contains: q,
                mode: "insensitive",
            };
        }

        // 2. Only add 'job_type' filter if 'jt' parameter exists
        if (jt) {
            where.job_type = jt;
        }

        // 3. Only add 'employment_type' filter if 'et' parameter exists
        if (et) {
            where.employment_type = et;
        }
        
        // 4. Only add 'salary' filter if 'ms' parameter exists
        if (minSalaryParam) {
            where.salary = {
                gte: Number.parseInt(minSalaryParam)
            }
        }

        const data = await db.openings.findMany({
            where, // Use our dynamically built 'where' object
            take: limit,
            skip: (page - 1) * limit,
        });

        return NextResponse.json({
            success: true,
            data: data,
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: `something went wrong! ${error}`
        });
    }
}