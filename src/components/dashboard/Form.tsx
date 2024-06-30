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
import { Input } from "../ui/input";
import { Grid } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface Body {
  name: string;
  location: string;
  description: string;
  image: string;
  room: number;
  price: number;
}

export default function Form({ open, setOpen }) {
  const [body, setBody] = React.useState({
    name: "",
    location: "",
    description: "",
    image: "",
    room: null,
    price: null,
  });
  const [base64, setBase64] = React.useState("");

  const handleChange = (e) => {
    setBody((a) => {
      return {
        ...a,
        [e.target.name]: e.target.value,
      };
    });
  };

  console.log(body);
  const handleChangeFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64(base64String);
        setBody((e) => ({ ...e, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        if (!body[key as keyof Body]) return;
      }
    }
    await fetch("/api/v1/hotel", {
      method: "POST",
      body: JSON.stringify(body),
    });
    setOpen(false);
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
                    value={body.name}
                    onChange={handleChange}
                    className="mt-1"
                    type="text"
                    placeholder="Nom"
                    name="name"
                  />
                </Grid>
                <Grid>
                  <Input
                    className="mt-4"
                    type="textarea"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Input
                  type="text"
                  placeholder="Location"
                  name="location"
                  onChange={handleChange}
                />
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Input
                  min={1}
                  type="number"
                  placeholder="rooms"
                  onChange={handleChange}
                  name="room"
                />
              </Grid>
              {/* Recent Orders */}
              {/* <Grid item xs={12}>
                <Input type="file" placeholder="Fichier" accept=" png" />
              </Grid> */}
              <Grid item xs={12} md={8} lg={9}>
                <Input
                  type="file"
                  name="image"
                  placeholder="Fichier"
                  accept=" png"
                  onChange={handleChangeFile}
                />
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Input
                  min={1}
                  type="number"
                  onChange={handleChange}
                  placeholder="prix"
                  name="price"
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onSubmit()}>OUI</Button>
          <Button onClick={() => setOpen(false)}>NON</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
