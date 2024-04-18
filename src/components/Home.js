import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";

function HomePage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/repositories/${username}`);
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        color="text.primary"
        px={2}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to the GitHub Repository Finder
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Enter a GitHub username to search for their repositories
        </Typography>
        <Box mt={2} width="100%">
          <TextField
            label="GitHub Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ fontFamily: "Poppins, sans-serif" }}
          />
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            Search
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;
