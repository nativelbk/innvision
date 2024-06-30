/** @format */

import mongoose, { Schema, Document, Model } from "mongoose";

interface IReservation extends Document {
  customer: mongoose.Types.ObjectId;
  hotel: mongoose.Types.ObjectId;
  room: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: "pending" | "confirmed" | "cancelled";
  number: number;
}

const ReservationSchema: Schema<IReservation> = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  number: Number,
});

const Reservation: Model<IReservation> =
  mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", ReservationSchema);

export default Reservation;
