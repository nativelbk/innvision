/** @format */

// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/mongoose";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  await dbConnect();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return NextResponse.json(
      { message: "User does not exists" },
      { status: 400 }
    );
  }

  const isValid = await bcrypt.compare(password, existingUser.password);

  if (isValid) {
    return NextResponse.json(
      { Authenticated: true, user: existingUser },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ Authenticated: false }, { status: 200 });
  }
}
