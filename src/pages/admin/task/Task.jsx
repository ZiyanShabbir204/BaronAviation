import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ApiService from "../../../api.service";
import {
  Container,
  Box,
  Typography,
  Alert,
  CircularProgress,
  LinearProgress,
  Stack,
  Button,
} from "@mui/material";

const Task = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("This request has already been fulfilled.");
  const [isError, setIsError] = useState(false);
  const token = searchParams.get("token");
  const navigate = useNavigate();
  

  useEffect(() => {
   
    const executeTask = async () => {
      try {
        const res = await ApiService.get(`/task/exe?token=${token}`);
        setLoading(false);
        setText("The task has been successfully completed!");
      } catch (error) {
        setLoading(false);
        setIsError(true);
        let errorMessage = 'This request has already been fulfilled.'
        switch (error.response?.data?.message) {
            case "jwt expire":
                errorMessage = 'This task has expired. Please request a new one to continue.'
                break;
            case "Task already been complete":
                errorMessage = 'This request has already been completed.'
                break
            case "invalid signature":
                errorMessage = "The link is invalid. Please ensure you're using the correct link."
                break
            default:
                break;
        }

        setText(errorMessage)
        
      }
    };

    executeTask();
  }, [token]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      {loading ? (
        <Box>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Verifying Task...
          </Typography>
          <CircularProgress color="primary" size={60} />
          <LinearProgress
            variant="indeterminate"
            sx={{ mt: 3, height: 8 }}
            color="secondary"
          />
        </Box>
      ) : (
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          {isError ? (
            <Alert severity="error" sx={{ width: "100%" }}>
              <Typography variant="h6" textAlign="start" component="h3">
                Error
              </Typography>
              <Typography textAlign="start" variant="body1">{text}</Typography>
            </Alert>
          ) : (
            <Alert severity="success" sx={{ width: "100%" }}>
              <Typography variant="h6" textAlign="start" component="h3">
                Success
              </Typography>
              <Typography textAlign="start" variant="body1">{text}</Typography>
            </Alert>
          )}

          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/")} 
            sx={{ mt: 4 }}
          >
            Go to Home
          </Button>
        </Stack>
      )}
    </Container>
  );
};

export default Task;
