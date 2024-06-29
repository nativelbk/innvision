/** @format */

import mongoose, { Schema, Document, Model } from "mongoose";

interface IHotel extends Document {
  name: string;
  location: string;
  description: string;
  rooms: mongoose.Types.ObjectId[];
  roomsReserved: number;
  roomsFree: number;
}

const HotelSchema: Schema<IHotel> = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  roomsReserved: {
    type: Number,
    default: 0,
  },
  roomsFree: Number,
});

const Hotel: Model<IHotel> =
  mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", HotelSchema);

export default Hotel;
