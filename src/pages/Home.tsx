import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { RiLoginBoxLine, RiUserAddLine } from 'react-icons/ri';

const Home: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        height: { xs: 'calc(100vh - 64px)', sm: 'calc(100vh - 80px)' },
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: 800,
          padding: 4,
          borderRadius: 2,
          backgroundColor: '#fff',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h1"
            sx={{ fontSize: 48, color: '#333', fontWeight: 700 }}
          >
            Welcome to BookVerse!
          </Typography>
        </Grid>
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="body1"
            sx={{ fontSize: 18, color: '#666', textAlign: 'center' }}
          >
            Discover new books, connect with fellow readers, and explore a world
            of literature. Join our community today and start reading, sharing,
            and enjoying books like never before!
          </Typography>
        </Grid>

        <Grid
          width="100%"
          justifyContent="space-between"
          display="flex"
          alignItems="center"
          gap={4}
        >
          <Button
            component={Link}
            to="/login"
            variant="contained"
            startIcon={<RiLoginBoxLine size={24} color="#fff" />}
            fullWidth
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<RiUserAddLine size={24} color="#fff" />}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
