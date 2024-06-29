/** @format */

import mongoose, { Schema, Document, Model } from "mongoose";

interface IRoom extends Document {
  hotel: mongoose.Types.ObjectId;
  number: string;
  type: string;
  price: number;
  description: string;
  available: boolean;
  roomImages: string[];
}

const RoomSchema: Schema<IRoom> = new Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  number: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  available: { type: Boolean, default: true },
  roomImages: [String],
});

const Room: Model<IRoom> =
  mongoose.models.Room || mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
