// BookList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Alert, Container, Typography, Grid, Card, CardMedia } from "@mui/material";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/books', {
          headers: {
            Authorization: `Bearer${localStorage.getItem('access_token')}`
          }
        });
        setBooks(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Failed to fetch books', error)
      } finally {
        setLoading(false);
      };
    };
    fetchBooks();
  },[]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
   return <Alert severity="error">{error}</Alert>; 
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Book List
      </Typography>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia>

              </CardMedia>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookList;
