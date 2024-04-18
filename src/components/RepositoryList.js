import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  Box,
  CardMedia,
  createTheme,
  ThemeProvider,
  Grid,
  Button,
} from "@mui/material";

function RepositoryListPage() {
  const { username } = useParams();
  const [repositories, setRepositories] = useState([]);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwnerAndRepositories = async () => {
      try {
        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setOwner(userResponse.data);

        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        setRepositories(reposResponse.data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    fetchOwnerAndRepositories();
  }, [username]);

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
        minHeight="100vh"
      >
        {owner && owner.avatar_url && (
          <Card
            sx={{
              width: 400,
              margin: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              src={owner.avatar_url}
              alt="Repository Owner"
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                {owner.login}
              </Typography>
              <Typography color="textSecondary">
                Public Repositories: {owner.public_repos}
              </Typography>
              <Typography color="textSecondary">
                Followers: {owner.followers}
              </Typography>
              <Typography color="textSecondary">
                Following: {owner.following}
              </Typography>
              <MuiLink
                href={owner.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </MuiLink>
            </CardContent>
          </Card>
        )}

        <Box width="100%" maxWidth="1250px">
          <h2 className="heading" style={{ fontFamily: "Poppins, sans-serif" }}>
            Repositories for {username}
          </h2>
          <Grid container spacing={2}>
            {repositories.map((repo) => (
              <Grid item xs={12} sm={6} md={4} key={repo.id}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h2"
                      className="sub-heading"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <Link
                        to={`/repositories/${username}/${repo.name}`}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Repository Name: {repo.name}
                      </Link>
                    </Typography>
                    <Typography
                      color="textSecondary"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Description:{" "}
                      {repo.description || "No description available"}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Language: {repo.language || "Unknown"}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Stars: {repo.stargazers_count}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Forks: {repo.forks_count}
                    </Typography>
                    <MuiLink
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      View on GitHub
                    </MuiLink>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Button
          variant="contained"
          style={{ marginTop: "5px", fontFamily: "Poppins, sans-serif" }}
        >
          <Link
            to={`/followers/${username}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            View Followers
          </Link>
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default RepositoryListPage;
