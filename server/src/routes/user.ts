import express from 'express';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/roles';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

/**
 * @route   GET /api/user/dashboard
 * @desc    Get dashboard data based on user role
 * @access  Protected
 */
router.get(
    '/dashboard',
    authenticateJWT,
    authorizeRoles('admin', 'user', 'visitor'),
    (req: AuthRequest, res) => {
        // Dashboard logic based on user role
        const userRole = req.user.role;

        let dashboardData;

        if (userRole === 'admin') {
            dashboardData = {
                msg: 'Welcome Admin! Here is your dashboard.',
                // Include admin-specific data
            };
        } else if (userRole === 'user') {
            dashboardData = {
                msg: 'Welcome User! Here is your dashboard.',
                // Include user-specific data
            };
        } else if (userRole === 'visitor') {
            dashboardData = {
                msg: 'Welcome Visitor! Here is your dashboard.',
                // Include visitor-specific data
            };
        } else {
            return res.status(403).json({ msg: 'Access denied: Unknown role' });
        }

        res.json(dashboardData);
    }
);

export default router;
