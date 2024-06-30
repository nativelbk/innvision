/** @format */
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Hotel from "@/models/Hotel";
import dbConnect from "@/lib/mongoose";
import Joi from "joi";

const hotelSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  rooms: Joi.array().items(Joi.string().hex().length(24)),
  roomsFree: Joi.number().integer(),
  images: Joi.array().items(Joi.string()),
});

export const POST = async (req, { params }) => {
  await dbConnect();
  const body = await req.json();

  // const { error } = hotelSchema.validate(req.body);
  // if (error) {
  //   return NextResponse.json(
  //     { success: false, error: error.details[0].message },
  //     { status: 400 }
  //   );
  // }

  try {
    const { name, location, description, rooms, image, price } = body;
    const newHotel = new Hotel({
      name,
      location,
      description,
      rooms,
      roomsFree: rooms,
      image,
      price,
    });
    await newHotel.save();
    return NextResponse.json(
      { success: true, data: newHotel },
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
    const hotels = await Hotel.find({});
    return NextResponse.json({ success: true, data: hotels });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
};
