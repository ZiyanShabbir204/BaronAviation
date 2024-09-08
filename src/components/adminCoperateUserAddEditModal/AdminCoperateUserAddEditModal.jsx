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
  Select,
  Stack,
  MenuItem,
} from "@mui/material";

import ApiService from "../../api.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  minWidth: 400,
  width: "50%",
  border: 0,
  borderRadius: "5px",
};

export default function AdminCoperateUserAddEditModal({
  open,
  setOpen,
  schema,
  initialValues,
  isRoleExist,
  isTotalHoursExist,
  userId,
  onRequestComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => setOpen(false);

  const submitHandler = async (values) => {
    try {
      const { username, email, phone, password, role, total_hours } = values;
      let res;
      if (isRoleExist && !userId) {
        res = await ApiService.post("auth/register", {
          username,
          email,
          phone,
          password,
          roleName: role,
        });
      }

      if (isRoleExist && userId) {
        res = await ApiService.put(`admin/${userId}`, {
          phone,
          password,
          role_name: role,
        });
      }

      if (isTotalHoursExist) {
        res = await ApiService.post("admin/cooperate-customer/register", {
          username,
          email,
          phone,
          password,
          hours: total_hours,
        });
      }

      onRequestComplete && onRequestComplete(res);
      handleClose();
    } catch (err) {
      console.log("Error in FlightRequestEditAddModal -> submitHandler", err);
      const errorMessage = err.response.data.message || err.response.data.error;
      setError(errorMessage);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: submitHandler,
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
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
        {error && (
          <Typography color="warning" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            disabled={userId}
            sx={{ mt: 2 }}
          />
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
            disabled={userId}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{ mt: 2 }}
          />
          <TextField
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
          />

          {isRoleExist && (
            <Select
              id="role"
              name="role"
              label="Role"
              value={formik.values.role}
              onChange={(e) => formik.setFieldValue("role", e.target.value)}
              onBlur={formik.handleBlur}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              fullWidth
              sx={{ mt: 2 }}
            >
              <MenuItem value="sys_admin">System Admin</MenuItem>
              <MenuItem value="booking_agent">Booking Agent</MenuItem>
              <MenuItem value="maintenance_worker">Mantainence Worker</MenuItem>
            </Select>
          )}

          {isTotalHoursExist && (
            <TextField
              fullWidth
              id="total_hours"
              name="total_hours"
              label="Total Hours"
              type="number"
              value={formik.values.total_hours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.total_hours && Boolean(formik.errors.total_hours)
              }
              helperText={
                formik.touched.total_hours && formik.errors.total_hours
              }
              sx={{ mt: 2 }}
            />
          )}

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
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
