/** @format */

import mongoose, { Schema, Document, Model } from "mongoose";
import { ImageResponse } from "next/server";

interface IHotel extends Document {
  name: string;
  location: string;
  description: string;
  rooms: number;
  roomsReserved: number;
  roomsFree: number;
  image: string;
  price: number;
}

const HotelSchema: Schema<IHotel> = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  rooms: Number,
  roomsReserved: {
    type: Number,
    default: 0,
  },
  roomsFree: Number,
  image: String,
  price: Number,
});

const Hotel: Model<IHotel> =
  mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", HotelSchema);

export default Hotel;
