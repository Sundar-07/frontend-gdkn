import React from "react";
import { useAPI } from "../contexts/CustomerContext";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { EditDialog } from "./Edit/EditDialog";

function createData(name, title) {
  return { name, title };
}

export const ProfileCard = ({ customerById }) => {
  const { deleteData } = useAPI();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows = [
    createData("Address Line 1", customerById.address),
    createData("Landmark", customerById.landmark),
    createData("City", customerById.city),
    createData("State", customerById.state),
    createData("Country", customerById.country),
    createData("ZipCode", customerById.zipcode),
  ];
  return (
    <>
      {/* {customer.firstName} &emsp;
      <button onClick={() => deleteData(customer._id)}>Delete</button> */}

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card sx={{ width: "auto" }} variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="name">
                  {customerById.firstName[0]}
                </Avatar>
              }
              title={customerById.firstName + " " + customerById.lastName}
              subheader={
                <React.Fragment>
                  <Stack direction="row" spacing={2}>
                    <Button
                      size="small"
                      style={{ textTransform: "none" }}
                      color="inherit"
                      startIcon={<Person2OutlinedIcon />}
                    >
                      {customerById.userName}
                    </Button>
                    <Button
                      size="small"
                      style={{ textTransform: "none" }}
                      color="inherit"
                      startIcon={<EmailOutlinedIcon />}
                    >
                      {customerById.email}
                    </Button>
                    <Button
                      size="small"
                      style={{ textTransform: "none" }}
                      color="inherit"
                      startIcon={<LocalPhoneOutlinedIcon />}
                    >
                      {customerById.phone}
                    </Button>
                  </Stack>
                </React.Fragment>
              }
            />

            <CardContent>
              <Stack direction="row" spacing={2}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<EditOutlinedIcon />}
                  onClick={handleClickOpen}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteData(customerById._id)}
                >
                  Delete Customer
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <br />
      <hr style={{ width: "85%" }} />
      {/* Personal Details content goes g=here */}
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs>
          <Card sx={{ minWidth: 220 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                First Name
              </Typography>
              <Typography variant="h5" component="div">
                {customerById.firstName}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs>
          <Card sx={{ minWidth: 220 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Last Name
              </Typography>
              <Typography variant="h5" component="div">
                {customerById.lastName}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs>
          <Card sx={{ minWidth: 220 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Gender
              </Typography>
              <Typography variant="h5" component="div">
                {customerById.gender}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs>
          <Card sx={{ minWidth: 220 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Date of Birth
              </Typography>
              <Typography variant="h5" component="div">
                {customerById.dob}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            Address
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              {/* <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Edit dialog appears  */}
      <EditDialog
        handleClose={handleClose}
        open={open}
        fullScreen={fullScreen}
        customerById={customerById}
      />
    </>
  );
};
