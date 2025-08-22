// src/modules/driver/driver.routes.ts
import { Router } from 'express';
import { acceptRide, completeRide, getAvailableRides, getDriverById, getDriverEarnings, rejectRide, startRide, updateRideStatus } from './driver.controller';
import { authenticate, authorize } from '../auth/auth.controller';
// import { authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/available',authenticate,  authorize('driver'),getAvailableRides);

// View driver earnings (Driver only)
router.get('/earnings', authenticate, authorize("driver"), getDriverEarnings);

router.patch('/:id/status', authenticate, authorize('driver'), updateRideStatus);

// Get a single driver by ID (Admin or Driver himself)
router.get('/:id', authenticate, authorize("admin", "driver"), getDriverById);
router.patch('/:id/accept', authenticate,authorize('driver'),acceptRide);
router.patch('/:id/reject', authenticate,authorize('driver'),rejectRide);
router.patch( '/:id/start',  authenticate, authorize('driver'),startRide);
router.patch( '/:id/complete',authenticate,authorize('driver'), completeRide);

export default router;
