import cors from 'cors';
import express from "express";
import mongoose from "mongoose";
import { PORT, MONGO_DB_URL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(200).send('Welcome to MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log('App connected to database');

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
