import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { authApi } from '../services/api';
import type { LoginRequest, LoginResponse } from '../types';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const credentials: LoginRequest = { email, password };
    try {
      const response: LoginResponse = await authApi.login(credentials);
      console.log('Login successful:', response);
      // Save user response in local storage
      localStorage.setItem('user', JSON.stringify(response));
      // Navigate user to /dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure
    }
  };

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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
