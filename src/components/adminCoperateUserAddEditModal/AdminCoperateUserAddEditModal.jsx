import { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import AddIcon from "@mui/icons-material/Add";

import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Container,
  Stack,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminCoperateUserAddEditModal({
  open,
  setOpen,
  schema,
  initialValues,
  roleAbled,
  totalHoursAbled,
  passwordAbled
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => setOpen(false);

  //   let initialValues;

  //   if(param) {
  //     initialValues =  {
  //         username: param.username,
  //         email: param.email,
  //         phone: param.phone,
  //         password: param.password,
  //         role: param.role
  //       }
  //   } else {
  //     initialValues =  {
  //         username: param.username,
  //         email: param.email,
  //         phone: param.phone,
  //         password: param.password,
  //         role: param.role
  //       }
  //   }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            Add Admin
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              sx={{ mt: 2 }}
            />
            {passwordAbled &&<TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
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
            />}
            {roleAbled && ( 
              <TextField
                fullWidth
                id="role"
                name="role"
                label="Role"
                type="text"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
                sx={{ mt: 2 }}
              />
            )}
            {totalHoursAbled && (
              <TextField
                fullWidth
                id="total_hours"
                name="total_hours"
                label="Total Hours"
                type="number"
                value={formik.values.total_hours}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.total_hours && Boolean(formik.errors.total_hours)}
                helperText={formik.touched.total_hours && formik.errors.total_hours}
                sx={{ mt: 2 }}
              />
            )}

            <Stack sx={{ mt: 1 }}></Stack>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              marginTop="20px"
            >
              <Button
                variant="outlined"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClose}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
