import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      {submitted && <Alert severity="success">Thank you for contacting us!</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />
        <TextField label="Message" name="message" value={form.message} onChange={handleChange} fullWidth multiline rows={4} sx={{ mb: 2 }} required />
        <Button type="submit" variant="contained">Send</Button>
      </Box>
    </Container>
  );
}
