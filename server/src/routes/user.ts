import express from 'express';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/roles';

const router = express.Router();

router.get('/dashboard', authenticateJWT, authorizeRoles('admin', 'user'), (req, res) => {
  // Dashboard logic
});

export default router;
