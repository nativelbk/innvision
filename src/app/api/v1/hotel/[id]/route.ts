/** @format */

import Hotel from "@/models/Hotel";
import dbConnect from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { id } = req.query;
    const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedHotel) {
      return res.status(404).json({ success: false, error: "Hotel not found" });
    }
    return res.status(200).json({ success: true, data: updatedHotel });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { id } = req.query;
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      return res.status(404).json({ success: false, error: "Hotel not found" });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
