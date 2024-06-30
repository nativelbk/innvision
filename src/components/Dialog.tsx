/** @format */

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Grid } from "@mui/material";
import { Input } from "./ui/input";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, id }) {
  const [body, setBody] = React.useState({
    endDate: "",
    startDate: "",
    customer: "",
    hotel: "",
    number: null,
  });
  const handleChange = (e) => {
    setBody((a) => {
      return {
        ...a,
        [e.target.name]: e.target.value,
        hotel: id,
      };
    });
  };
  console.log(body);
  const handleSubmit = async () => {
    await fetch("/api/v1/reservation", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Input
                    value={body.number}
                    onChange={handleChange}
                    className="mt-1"
                    type="number"
                    min={1}
                    placeholder="Nombre à reserver"
                    name="number"
                  />
                </Grid>
                <Grid>
                  <label className=" text-sm mt-4 " htmlFor="deb">
                    Début
                  </label>
                  <Input
                    value={body.startDate}
                    onChange={handleChange}
                    className="mt-1"
                    type="date"
                    min={1}
                    placeholder="Début"
                    id="deb"
                    name="startDate"
                  />
                </Grid>
                <Grid>
                  <label className=" text-sm mt-4 " htmlFor="fin">
                    Fin
                  </label>
                  <Input
                    value={body.endDate}
                    onChange={handleChange}
                    className="mt-1"
                    type="date"
                    min={1}
                    placeholder="Fin"
                    id="fin"
                    name="endDate"
                  />
                </Grid>
              </Grid>
              {/* Recent Deposits */}
              {/* Recent Orders */}
              {/* <Grid item xs={12}>
                <Input type="file" placeholder="Fichier" accept=" png" />
              </Grid> */}
              {/* Recent Deposits */}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>OUI</Button>
          <Button onClick={() => setOpen(false)}>NON</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
