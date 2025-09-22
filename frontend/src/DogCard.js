import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

export default function DogCard({ dog, onView }) {
  return (
    <Card sx={{ maxWidth: 300, m: 2 }}>
      <CardMedia
        component="img"
        height="180"
        image={`https://placedog.net/400/2${dog.id}`}
        alt={dog.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dog.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dog.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${dog.price}
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => onView(dog.id)}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
