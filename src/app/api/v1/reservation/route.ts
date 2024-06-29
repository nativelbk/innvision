/** @format */
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/Reservation";
import Joi from "joi";

const reservationSchema = Joi.object({
  customer: Joi.string().hex().length(24).required(),
  room: Joi.string().hex().length(24).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  status: Joi.string()
    .valid("pending", "confirmed", "cancelled")
    .default("pending"),
});

export const POST = async (req: NextApiRequest) => {
  await dbConnect();

  const { error } = reservationSchema.validate(req.body);
  if (error) {
    return NextResponse.json(
      { success: false, error: error.details[0].message },
      { status: 400 }
    );
  }

  try {
    const { customer, room, startDate, endDate, status } = req.body;
    const newReservation = new Reservation({
      customer,
      room,
      startDate,
      endDate,
      status,
    });
    await newReservation.save();
    return NextResponse.json(
      { success: true, data: newReservation },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
};

export const GET = async () => {
  await dbConnect();

  try {
    const reservations = await Reservation.find({});
    return NextResponse.json({ success: true, data: reservations });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
};
