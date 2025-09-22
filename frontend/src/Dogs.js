import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Alert } from '@mui/material';
import DogCard from './DogCard';

export default function Dogs() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [purchaseForm, setPurchaseForm] = useState({ name: '', email: '' });
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    fetch('/api/dogs')
      .then(res => res.json())
      .then(data => setDogs(data));
  }, []);

  const viewDog = (id) => {
    fetch(`/api/dogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setSelectedDog(data);
        setOpenDialog(true);
      });
  };

  const handleBuy = () => {
    fetch(`/api/dogs/buy/${selectedDog.id}`, { method: 'POST' })
      .then(res => res.text())
      .then(msg => {
        setMessage(msg);
        setDogs(dogs.filter(d => d.id !== selectedDog.id));
        setOpenDialog(false);
        setShowSnackbar(true);
        setSelectedDog(null);
        setPurchaseForm({ name: '', email: '' });
      });
  };

  const handleFormChange = (e) => {
    setPurchaseForm({ ...purchaseForm, [e.target.name]: e.target.value });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Featured Dogs
      </Typography>
      <Grid container justifyContent="center">
        {dogs.map(dog => (
          <DogCard key={dog.id} dog={dog} onView={viewDog} />
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedDog?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={`https://placedog.net/500/2${selectedDog?.id}`}
              alt={selectedDog?.name}
              style={{ width: '100%', maxWidth: 350, borderRadius: 8 }}
            />
            <Typography variant="body1" sx={{ mt: 2 }}>{selectedDog?.description}</Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>Price: ${selectedDog?.price}</Typography>
          </Box>
          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              label="Your Name"
              name="name"
              value={purchaseForm.name}
              onChange={handleFormChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={purchaseForm.email}
              onChange={handleFormChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleBuy} disabled={!purchaseForm.name || !purchaseForm.email}>
            Buy Now
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={showSnackbar} autoHideDuration={4000} onClose={() => setShowSnackbar(false)}>
        <Alert onClose={() => setShowSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
