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
import { useSnackbar } from "notistack";
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
  title,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => setOpen(false);

  const submitHandler = async (values) => {
    try {
      const {
        username,
        email,
        phone,
        password,
        role,
        total_hours,
        first_name,
        last_name,
      } = values;
      let res;
      if ((isRoleExist || (!isRoleExist && !isTotalHoursExist)) && !userId) {
        res = await ApiService.post("auth/register", {
          username,
          email,
          phone,
          password,
          roleName: isRoleExist ? role : "customer",
          first_name,
          last_name,
        });
        enqueueSnackbar("Admin has been created.", {
          variant: "success",
        });
      } else if (isRoleExist && userId) {
        res = await ApiService.put(`admin/${userId}`, {
          phone,
          first_name,
          last_name,
          password,
          role_name: role,
        });

        enqueueSnackbar("Admin has been updated.", {
          variant: "success",
        });
      } else if (isTotalHoursExist && !userId) {
        res = await ApiService.post("admin/cooperate-customer/register", {
          username,
          email,
          phone,
          password,
          first_name,
          last_name,
          hours: total_hours,
        });

        enqueueSnackbar("Coperate yser has been created.", {
          variant: "success",
        });
      } else if (isTotalHoursExist && userId) {
        // console.log("updateeeeee")
        res = await ApiService.put(`admin/cooperate-customer/${userId}`, {
          phone,
          password,
          first_name,
          last_name,
        });
        enqueueSnackbar("Corporate client has been updated.", {
          variant: "success",
        });
      } else if (!isRoleExist && !isTotalHoursExist && userId) {
        res = await ApiService.put(`admin/users/${userId}`, {
          phone,
          password,
          first_name,
          last_name,
        });
        //

        enqueueSnackbar("User has been updated.", {
          variant: "success",
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

  const getNameFieldLabel = () => {
    if (isRoleExist) {
      return "Username";
    } else if (isTotalHoursExist) {
      return "Username";
    }
    return "Username";
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
          {title}
        </Typography>
        {error && (
          <Typography color="warning" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="first_name"
            name="first_name"
            label="First Name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            id="last_name"
            name="last_name"
            label="Last Name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            id="username"
            name="username"
            label={getNameFieldLabel()}
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
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
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
              disabled={userId}
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
