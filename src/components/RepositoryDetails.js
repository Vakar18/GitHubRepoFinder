import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";

function RepositoryDetailsPage() {
  const { username, repoName } = useParams();
  const [repository, setRepository] = useState({});

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${username}/${repoName}`
        );
        setRepository(response.data);
      } catch (error) {
        console.error("Error fetching repository:", error);
      }
    };
    fetchRepository();
  }, [username, repoName]);

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
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Repository Name: {repository.name}
            </Typography>
            <Typography color="textSecondary">
              Description:{" "}
              {repository.description || "No description available"}
            </Typography>
            {repository.language && (
              <Typography color="textSecondary">
                Language: {repository.language}
              </Typography>
            )}
            <Typography color="textSecondary">
              Size: {repository.size} KB
            </Typography>
            <Typography color="textSecondary">
              Stars: {repository.stargazers_count}
            </Typography>
            <Typography color="textSecondary">
              Forks: {repository.forks_count}
            </Typography>
            {repository.license && (
              <Typography color="textSecondary">
                License: {repository.license.name}
              </Typography>
            )}
            <Typography color="textSecondary">
              Created At: {new Date(repository.created_at).toLocaleDateString()}
            </Typography>
            <Typography color="textSecondary">
              Last Updated:{" "}
              {new Date(repository.updated_at).toLocaleDateString()}
            </Typography>
            {repository.homepage && (
              <Typography color="textSecondary">
                Homepage:{" "}
                <Link
                  href={repository.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {repository.homepage}
                </Link>
              </Typography>
            )}
            <Typography color="textSecondary">
              URL:{" "}
              <Link
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontFamily: "Poppins, sans-serif" }}
              >
                {repository.html_url}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

export default RepositoryDetailsPage;
