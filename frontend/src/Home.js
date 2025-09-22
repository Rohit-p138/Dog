import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 6, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <img src="https://placedog.net/600/300" alt="DogBuy" style={{ borderRadius: 16, width: '100%', maxWidth: 600 }} />
      </Box>
      <Typography variant="h3" gutterBottom>Welcome to DogBuy</Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Find your perfect companion from our selection of beautiful, healthy dogs. Safe, easy, and trustworthy dog buying experience.
      </Typography>
      <Button variant="contained" size="large" component={RouterLink} to="/dogs">
        Browse Dogs
      </Button>
    </Container>
  );
}
