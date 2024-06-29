/** @format */
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Room from "@/models/Room";
import Joi from "joi";

const roomSchema = Joi.object({
  hotel: Joi.string().hex().length(24).required(),
  number: Joi.string().required(),
  type: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  available: Joi.boolean(),
  roomImages: Joi.array().items(Joi.string()),
});

export const POST = async (req: NextApiRequest) => {
  await dbConnect();

  const { error } = roomSchema.validate(req.body);
  if (error) {
    return NextResponse.json(
      { success: false, error: error.details[0].message },
      { status: 400 }
    );
  }

  try {
    const { hotel, number, type, price, description, available, roomImages } =
      req.body;
    const newRoom = new Room({
      hotel,
      number,
      type,
      price,
      description,
      available,
      roomImages,
    });
    await newRoom.save();
    return NextResponse.json({ success: true, data: newRoom }, { status: 201 });
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
    const rooms = await Room.find({});
    return NextResponse.json({ success: true, data: rooms });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
};
