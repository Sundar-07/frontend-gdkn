import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAPI } from "../contexts/CustomerContext";
import { ProfileCard } from "./ProfileCard";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
export const ProfileContent = () => {
  const { customerListsById } = useAPI();

  //   console.log(customerListsById.firstName);

  return (
    <div>
      {customerListsById ? (
        <ProfileCard customerById={customerListsById} />
      ) : (
        <Typography variant="h6" gutterBottom>
          Please select the customer list
        </Typography>
      )}
    </div>
  );
};
