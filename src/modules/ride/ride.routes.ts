import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { requestRide, cancelRide, getRideHistory, getAvailableRides, acceptRide, startRide, completeRide, getRideStatus } from './ride.controller';

const router = Router();

// Rider routes
router.post('/request', authenticate, authorize('rider'), requestRide);
router.patch('/:id/cancel', authenticate, authorize('rider'), cancelRide);
router.get('/my', authenticate, authorize('rider'), getRideHistory);
router.get('/available',authenticate,  authorize('driver'),getAvailableRides);
// routes/ride.route.ts
router.patch('/:id/accept', authenticate,authorize('driver'),acceptRide);
router.patch( '/:id/start',  authenticate, authorize('driver'),startRide);
router.patch( '/:id/complete',authenticate,authorize('driver'), completeRide);
router.get('/:id/status', authenticate, authorize('rider'), getRideStatus);

export default router;
