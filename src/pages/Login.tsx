import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useLoginMutation } from '../services/api';
import type { LoginRequest } from '../types';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const credentials: LoginRequest = { email, password };
    try {
      const response = await login(credentials).unwrap();
      // Save access_token, refresh_token, and user in local storage
      localStorage.setItem(
        'user',
        JSON.stringify({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          user: response.user,
        })
      );
      navigate('/dashboard');
    } catch (err) {
      // Handle login failure
      console.error('Login failed:', err);
    }
  };

  return (
    <Layout>
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
            <Button variant="contained" type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            {error && (
              <Typography color="error" marginTop={2}>
                Login failed. Please check your credentials.
              </Typography>
            )}
          </form>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;
