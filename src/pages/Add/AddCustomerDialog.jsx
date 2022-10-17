import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import Container from "@mui/material/Container";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

export const AddCustomerDialog = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < 1) {
      setActiveStep((currentStep) => currentStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep !== 0) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  };

  //steps form jsx
  const StepFormOne = () => {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 8 }}
          >
            <Grid item>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                type="password"
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  };

  const StepFormTwo = () => {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 8 }}
          >
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Address Line 1"
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Country"
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="State"
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Zip Code"
                variant="outlined"
                type="number"
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
        <DialogTitle>Add User | Personal Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
            >
              <Step>
                <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
              </Step>
            </Stepper>
          </DialogContentText>
          {activeStep == 0 ? <StepFormOne /> : <StepFormTwo />}

          {/* {activeStep} */}
        </DialogContent>

        <DialogActions>
          <Button onClick={prevStep} variant="outlined">
            Prev
          </Button>
          <Button onClick={nextStep} variant="outlined">
            Next
          </Button>
        </DialogActions>
        {/* <hr style={{color:"black"}}/> */}
        <br />
        <Container>
          <Stack spacing={2} direction="row">
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
            <Button onClick={handleClose} variant="contained">
              Submit
            </Button>
          </Stack>
        </Container>
        <br />
      </Dialog>
    </div>
  );
};
