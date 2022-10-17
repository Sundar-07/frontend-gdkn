import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";

import { useAPI } from "../contexts/CustomerContext";
import { AddCustomerDialog } from "../pages/Add/AddCustomerDialog";

const drawerWidth = 240;
const ITEM_HEIGHT = 48;

export function Layout({ children }) {
  const { customerLists, getSingleData, setCustomerLists, selectedIndex } =
    useAPI();

  const [search, setSearch] = useState("");

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState("");

  const openSort = Boolean(anchorEl);

  //sorting the lists
  //sorting z to a
  const handleSort_ZA = () => {
    const sortedA = [...customerLists]
      .sort((first) => {
        return first.firstName;
      })
      .reverse();
    setCustomerLists(sortedA);
    // console.log(sortedA);
  };
  //sorting a to z
  const handleSort_AZ = () => {
    const sortedB = [...customerLists].sort((a) => {
      return a.firstName > a.firstName ? 1 : -1;
    });
    setCustomerLists(sortedB);
    // console.log(sortedB);
  };
  //radio menu
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // console.log(event.view);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log("value: " + event.target.value);
  };
  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Header */}
      <Header />
      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* Add button */}
            <ListItem
              secondaryAction={
                <>
                  <IconButton
                    // component={NavLink}
                    edge="end"
                    aria-label="add"
                    // to="/add"
                    onClick={handleClickOpen}
                  >
                    <AddCircleOutlineOutlinedIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary="Customers" />
            </ListItem>
            {/* Sort by */}
            <ListItem
              secondaryAction={
                <>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <SortOutlinedIcon />
                    <ListItemText primary="Sort By" />
                  </IconButton>

                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={openSort}
                    onClose={handleCloseSort}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    {/* Radio Group */}
                    <MenuItem onClick={handleClose}>
                      <FormControl>
                        {/* <FormLabel id="demo-radio-buttons-group-label">
                          Gender
                        </FormLabel> */}
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                          onChange={handleChange}
                          value={value}
                        >
                          <FormControlLabel
                            value="A-Z"
                            control={<Radio />}
                            label="A-Z"
                            onClick={handleSort_AZ}
                          />
                          <FormControlLabel
                            value="Z-A"
                            control={<Radio />}
                            label="Z-A"
                            onClick={handleSort_ZA}
                          />
                        </RadioGroup>
                      </FormControl>
                    </MenuItem>
                  </Menu>
                </>
              }
            >
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "65%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Search"
                  variant="standard"
                  multiline
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
            </ListItem>
            {/* Customers Lists && Search  */}
            {customerLists.length > 0 ? (
              customerLists
                .filter((text) => {
                  if (search == "") {
                    return text;
                  } else if (
                    text.firstName
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    text.email.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return text;
                  }
                })
                .map((text) => (
                  <ListItem key={text._id} disablePadding>
                    <ListItemButton
                      selected={selectedIndex === text._id}
                      onClick={(e) => getSingleData(text._id, e)}
                    >
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={text.firstName + " " + text.lastName}
                        secondary={text.email}
                      />
                    </ListItemButton>
                  </ListItem>
                ))
            ) : (
              <h2>No customer lists</h2>
            )}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div>{children}</div>
      </Box>
      {/* Add customer Dialog box */}
      <AddCustomerDialog
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        open={open}
      />
    </Box>
  );
}
