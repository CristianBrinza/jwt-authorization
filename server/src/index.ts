// src/index.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';  // Import as named export

import authRoutes from './routes/auth';
import userRoutes from './routes/user';

dotenv.config();

const app = express();

connectDB();  // Call the named function

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes setup
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
