/** @format */

// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import dbConnect from "@/lib/mongoose";

export async function POST(req: Request) {
  const { email, password, username } = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  await dbConnect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );
  }

  const user = new User({ email, username, password });
  await user.save();

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
