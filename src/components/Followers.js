import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
  createTheme,
  ThemeProvider,
  Grid,
} from "@mui/material";

function FollowersPage() {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/followers`
        );
        setFollowers(response.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };
    fetchFollowers();
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
        <h2 className="heading">Followers of {username}</h2>
        {followers.length === 0 ? (
          <Box>
            <CardMedia
              component="img"
              src="https://img.freepik.com/free-vector/images-concept-illustration_114360-218.jpg?t=st=1713456018~exp=1713459618~hmac=8183fd8ec410f452d99f52939d1a5677e28fb91f07f87e4c78f74562dfd84abb&w=740"
              alt="No followers"
              sx={{ height: 150 }}
            />
            <Typography variant="body1" color="textSecondary">
              No followers found for {username}.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {followers.map((follower) => (
              <Grid item xs={12} sm={6} md={4} key={follower.id}>
                <Card>
                  <a
                    href={follower.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardMedia
                      component="img"
                      src={follower.avatar_url}
                      alt={follower.login}
                      sx={{ height: 200 }}
                    />
                  </a>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h2"
                      className="sub-heading"
                      sx={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <a
                        href={follower.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Login Id: {follower.login}
                      </a>
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Profile URL:{" "}
                      <a
                        href={follower.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        {follower.html_url}
                      </a>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default FollowersPage;
