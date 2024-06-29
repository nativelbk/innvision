/** @format */
import Hotel from "@/models/Hotel";
import dbConnect from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

import Joi from "joi";

const hotelSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  rooms: Joi.array().items(Joi.string().hex().length(24)),
  roomsFree: Joi.number().integer(),
  images: Joi.array().items(Joi.string()),
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { error } = hotelSchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });

  try {
    const { name, location, description, rooms, roomsFree, images } = req.body;
    const newHotel = new Hotel({
      name,
      location,
      description,
      rooms,
      roomsFree,
      images,
    });
    await newHotel.save();
    return res.status(201).json({ success: true, data: newHotel });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const hotels = await Hotel.find({});
    return res.status(200).json({ success: true, data: hotels });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
