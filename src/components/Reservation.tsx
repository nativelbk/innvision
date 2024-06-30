/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Reservation({
  hotel,
  startDate,
  endDate,
  number,
}: any) {
  console.log(hotel, startDate, endDate);
  return (
    <Box sx={{ width: "80%" }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <div className=" flex gap-2 ">
              <div className=" w-20 h-20 ">
                <Image height={80} width={80} src={hotel?.image!} alt="img" />
              </div>
              <Typography variant="body2">
                <div>
                  <p>Hotel: {hotel.name}</p>
                  <p>Du: {startDate} </p>
                  <p>au: {endDate}</p>
                  <p>chambre: {number}</p>
                </div>
              </Typography>
            </div>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
