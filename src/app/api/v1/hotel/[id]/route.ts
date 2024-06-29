/** @format */

import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Hotel from "@/models/Hotel";
import dbConnect from "@/lib/mongoose";

export async function PATCH(req: NextApiRequest, { params }: any) {
  await dbConnect();

  try {
    const { id } = params;
    const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedHotel) {
      return NextResponse.json(
        { success: false, error: "Hotel not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updatedHotel });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextApiRequest, { params }: any) {
  await dbConnect();

  try {
    const { id } = params;
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      return NextResponse.json(
        { success: false, error: "Hotel not found" },
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
}
