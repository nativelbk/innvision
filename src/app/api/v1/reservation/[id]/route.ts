/** @format */
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/Reservation";

export const PATCH = async (req: NextApiRequest, { params }: any) => {
  await dbConnect();

  try {
    const { id } = params;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedReservation) {
      return NextResponse.json(
        { success: false, error: "Reservation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updatedReservation });
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
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return NextResponse.json(
        { success: false, error: "Reservation not found" },
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
