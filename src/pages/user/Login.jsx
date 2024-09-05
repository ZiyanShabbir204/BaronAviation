import React, { useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    usernameOrEmail: false,
    password: false,
  });

  const navigate =  useNavigate()

  const handleLogin = () => {
    const newErrors = {
      usernameOrEmail: !usernameOrEmail.trim(),
      password: !password.trim(),
    };
    setErrors(newErrors);

    // If there are no errors, proceed with login logic
    if (!newErrors.usernameOrEmail && !newErrors.password) {
      console.log("Login clicked", { usernameOrEmail, password });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
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
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="usernameOrEmail"
            label="Username or Email"
            name="usernameOrEmail"
            autoFocus
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            error={errors.usernameOrEmail}
            helperText={
              errors.usernameOrEmail ? "Username or Email is required" : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            helperText={errors.password ? "Password is required" : ""}
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
          <Stack direction="row" justifyContent="space-between">
          <Typography
            component="h6"
            variant="caption"
            sx={{
              "&:hover": {
                color: "blue",
                cursor: "pointer",
              },
            }}
            onClick={()=> navigate("/forgetpassword")}
          >
            forget password?
          </Typography>
          <Typography
            component="h6"
            variant="caption"
            sx={{
              "&:hover": {
                color: "blue",
                cursor: "pointer",
              },
            }}
            onClick={()=> navigate("/signup")}
          >
            Don't have an account? Signup
          </Typography>

          </Stack>
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
