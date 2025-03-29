import { NextResponse } from "next/server";
import ConsultModel from "../models/ConsultModel";
import { connectDB } from "../db/connect";

export async function POST(req: Request) {
    await connectDB();
    const { expertise } = await req.json();

    try {
        const matches = await ConsultModel.find({ expertise });
        return NextResponse.json({ success: true, matches });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" });
    }
}
