import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import WestIcon from "@mui/icons-material/West";

const validationSchema = Yup.object().shape({
  attendants: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      identityNumber: Yup.string().required("Identity number is required"),
      gender: Yup.string().required("Gender is required"),
      age: Yup.number()
        .required("Age is required")
        .min(0, "Age must be greater than 0"),
      email: Yup.string().email("Invalid email"),
      weight: Yup.number()
        .required("Passenger Weight is required")
        .min(0, "Passenger Weight must be greater than 0"),
      type: Yup.string(),
      label: Yup.string(),
    })
  ),
});

const TravelersFrom = ({ kids, adults, data, onBack, onCancel, onSubmit }) => {
  let initialValues = {
    attendants: [],
  };

  if (!data) {
    const adultInitialValues = Array.from({ length: adults }).map((_, idx) => ({
      firstName: "",
      lastName: "",
      identityNumber: "",
      gender: "",
      age: "",
      email: "",
      weight: undefined,
      type: "Adult",
      label: `Information of Adult ${idx + 1}`,
    }));

    const kidInitialValues = Array.from({ length: kids }).map((_, idx) => ({
      firstName: "",
      lastName: "",
      identityNumber: "",
      gender: "",
      age: "",
      email: "",
      weight: undefined,
      type: "children",
      label: `Information of Children ${idx + 1}`,
    }));
    initialValues = {
      attendants: [...adultInitialValues, ...kidInitialValues],
    };
  } else {
    const adultData = data.filter((d) => d.type === "Adult");

    const adultInitialValues = Array.from({ length: adults }).map((_, idx) => {
      const formData = adultData[idx];
      if (formData)
        return { ...formData, label: `Information of Adult ${idx + 1}` };
      return {
        firstName: "",
        lastName: "",
        identityNumber: "",
        gender: "",
        age: "",
        email: "",
        weight: undefined,
        type: "Adult",
        label: `Information of Adult ${idx + 1}`,
      };
    });

    const childernData = data.filter((d) => d.type === "children");

    const kidInitialValues = Array.from({ length: kids }).map((_, idx) => {
      const formData = childernData[idx];
      if (formData)
        return { ...formData, label: `Information of Children ${idx + 1}` };
      return {
        firstName: "",
        lastName: "",
        identityNumber: "",
        gender: "",
        age: "",
        email: "",
        weight: undefined,
        type: "children",
        label: `Information of Children ${idx + 1}`,
      };
    });

    initialValues.attendants = [...adultInitialValues, ...kidInitialValues];
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <FieldArray name="attendants">
            <div
              style={{
                maxHeight: "calc(100vh - 260px)",
                overflowY: "auto",
              }}
            >
              {values.attendants.map((attendant, index) => (
                <Box sx={{ flexGrow: 1, mb: 2 }}>
                  <Typography variant="h5" mb={2}>
                    {attendant.label}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Field
                        as={TextField}
                        name={`attendants[${index}].firstName`}
                        label="First Name"
                        fullWidth
                        error={
                          touched.attendants?.[index]?.firstName &&
                          Boolean(errors.attendants?.[index]?.firstName)
                        }
                        helperText={
                          touched.attendants?.[index]?.firstName &&
                          errors.attendants?.[index]?.firstName
                        }
                      />
                    </Grid>
                    <Grid size={6}>
                      <Field
                        as={TextField}
                        name={`attendants[${index}].lastName`}
                        label="Last Name"
                        fullWidth
                        error={
                          touched.attendants?.[index]?.lastName &&
                          Boolean(errors.attendants?.[index]?.lastName)
                        }
                        helperText={
                          touched.attendants?.[index]?.lastName &&
                          errors.attendants?.[index]?.lastName
                        }
                      />
                    </Grid>

                    <Grid size={6}>
                      <Field
                        as={TextField}
                        select
                        name={`attendants[${index}].gender`}
                        label="Gender"
                        fullWidth
                        error={
                          touched.attendants?.[index]?.gender &&
                          Boolean(errors.attendants?.[index]?.gender)
                        }
                        helperText={
                          touched.attendants?.[index]?.gender &&
                          errors.attendants?.[index]?.gender
                        }
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Field>
                    </Grid>

                    <Grid size={6}>
                      <Field
                        as={TextField}
                        name={`attendants[${index}].age`}
                        label="Age"
                        type="number"
                        fullWidth
                        error={
                          touched.attendants?.[index]?.age &&
                          Boolean(errors.attendants?.[index]?.age)
                        }
                        helperText={
                          touched.attendants?.[index]?.age &&
                          errors.attendants?.[index]?.age
                        }
                      />
                    </Grid>

                    <Grid size={6}>
                      <Field
                        as={TextField}
                        name={`attendants[${index}].weight`}
                        label="Passenger Weight (Kg)"
                        type="number"
                        fullWidth
                        error={
                          touched.attendants?.[index]?.weight &&
                          Boolean(errors.attendants?.[index]?.weight)
                        }
                        helperText={
                          touched.attendants?.[index]?.weight &&
                          errors.attendants?.[index]?.weight
                        }
                      />
                    </Grid>

                    <Grid size={6}>
                      <Field
                        as={TextField}
                        name={`attendants[${index}].email`}
                        label="Email"
                        fullWidth
                        error={
                          touched.attendants?.[index]?.email &&
                          Boolean(errors.attendants?.[index]?.email)
                        }
                        helperText={
                          touched.attendants?.[index]?.email &&
                          errors.attendants?.[index]?.email
                        }
                      />
                    </Grid>

                    <Grid size={12}>
                      <Field
                        as={TextField}
                        name={`attendants[${index}].identityNumber`}
                        label="Identity Number"
                        fullWidth
                        error={
                          touched.attendants?.[index]?.identityNumber &&
                          Boolean(errors.attendants?.[index]?.identityNumber)
                        }
                        helperText={
                          (touched.attendants?.[index]?.identityNumber &&
                            errors.attendants?.[index]?.identityNumber) ||
                          ""
                        }
                      />
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      my: 3,
                    }}
                  />
                </Box>
              ))}
            </div>
          </FieldArray>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            marginTop="20px"
          >
            <Stack flexDirection="row" gap="20px">
              <Button
                variant="outlined"
                color="error"
                onClick={onCancel}
                startIcon={<CloseIcon />}
              >
                Close
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => onBack(values)}
                startIcon={<WestIcon />}
              >
                Back
              </Button>
            </Stack>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default TravelersFrom;
