import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useSignUpMutation } from '../services/api';
import type { UserCreate } from '../types';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, { isLoading }] = useSignUpMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const user: UserCreate = {
        name,
        email,
        password,
        age: age || 0,
      };
      const response = await signUp(user).unwrap();
      console.log('User created:', response);
      // You can redirect the user to the login page or dashboard here
      setError(null);
    } catch (err: unknown) {
      setError(err?.data?.message || 'Sign up failed');
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
        minWidth={600}
        sx={{
          padding: 4,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.1)',
        }}
        display={'flex'}
        flexDirection={'column'}
        gap={4}
      >
        <Typography variant="h4">Sign Up</Typography>
        {error && (
          <Typography variant="body1" color="red">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} gap={4}>
            <TextField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <FormControl variant="outlined" fullWidth>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? 'hide the password'
                          : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl variant="outlined" fullWidth>
              <InputLabel>Confirm Password</InputLabel>
              <OutlinedInput
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? 'hide the password'
                          : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <TextField
              label="Age"
              type="number"
              value={age ?? ''}
              onChange={(e) =>
                setAge((e.target as HTMLInputElement).valueAsNumber)
              }
              fullWidth
            />
            <Button variant="contained" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Typography variant="body1" marginTop={2}>
              Already have an account? <a href="/login">Login</a>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
