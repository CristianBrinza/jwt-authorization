import express from 'express';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app = express();

// Middleware and routes setup

connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running');
});
