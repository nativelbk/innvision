/** @format */
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Room from "@/models/Room";

export const PATCH = async (req: NextApiRequest, { params }: any) => {
  await dbConnect();

  try {
    const { id } = params;
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRoom) {
      return NextResponse.json(
        { success: false, error: "Room not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updatedRoom });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
};

export const DELETE = async (req: NextApiRequest, { params }: any) => {
  await dbConnect();

  try {
    const { id } = params;
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return NextResponse.json(
        { success: false, error: "Room not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
};
