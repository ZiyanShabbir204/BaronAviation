import React, {useState} from 'react'
import { useFormik } from "formik";

import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { changePasswordValidationSchema } from "../../schema/validateSchema";

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
          password: "",
          confirmPassword: "",
        },
        validationSchema: changePasswordValidationSchema,
        onSubmit: (values) => {
          console.log("values", values);
        },
      });
      const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
      const handleClickShowConfirmPassword = () => {
        setConfirmShowPassword(!showConfirmPassword);
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
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
              Change Password
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                sx={{ mt: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                sx={{ mt: 2 }}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ mt: 1 }}
              >
                Change
              </Button>
            </form>
          </Box>
        </Container>
      
    </div>
  )
}

export default ChangePassword
