import React from "react";
import { useFormik } from "formik";
import { forgotPasswordValidationSchema } from "../../schema/validateSchema";
import {
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Box,
    Typography,
    Container,
  } from "@mui/material";
const ForgetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            padding: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mt: 2 }}
            />

            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 1 }}
            >
              Send Email
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default ForgetPassword;
