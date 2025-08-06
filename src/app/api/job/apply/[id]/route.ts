// src/app/api/application/route.ts

import { getUserFromCookies } from "@/hooks/helper";
import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await getUserFromCookies();

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User is not authenticated!"
            }, { status: 401 });
        }
        const body = await req.json();
        const { jobId } = body;

        if (!jobId) {
             return NextResponse.json({
                success: false,
                message: "Job ID is required."
            }, { status: 400 });
        }

        const appToSave = {
            user_id: user.id,
            job_id: jobId
        };

        const application = await db.application.create({
            data: appToSave
        });

        return NextResponse.json({
            success: true,
            data: application
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Server error!"
        }, { status: 500 });
    }
}