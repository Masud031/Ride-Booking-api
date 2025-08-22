import { Router } from 'express';
import { authenticate, authorize } from '../auth/auth.controller';
import { requestRide, cancelRide, getRideHistory,  getRideStatus,  } from './ride.controller';


const router = Router();

// Rider routes

router.post('/request', authenticate, authorize('rider'), requestRide);
router.patch('/:id/cancel', authenticate, authorize('rider'), cancelRide);
router.get('/my', authenticate, authorize('rider'), getRideHistory);
// routes/ride.route.ts
router.get("/history/:id", authenticate,authorize('rider'), getRideHistory);
router.get('/:id/status', authenticate, authorize('rider'), getRideStatus);



export default router;
