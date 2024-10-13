import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  // Registration logic
});

// Login Route
router.post('/login', async (req, res) => {
  // Login logic
});

export default router;
