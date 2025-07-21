import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 64px)"
      width="100%"
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" marginBottom={2}>
          Dashboard
        </Typography>
        <Typography variant="body1">Welcome, {user.user.name}!</Typography>
        <Typography variant="body1">Email: {user.user.email}</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
