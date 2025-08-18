import { createToken } from "@/services/jwt";
import db from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const userToCreate = {
        email: body.email,
        password: body.password,
        role: "user",
    }

    try {
        const user = await db.user.create({
            data: userToCreate
        })

        const userTokenData = {
            id: user.id
        }

        const token = createToken(userTokenData);
        const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST_NAME}`)
        res.cookies.set('token', token);
        return res;
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }

}