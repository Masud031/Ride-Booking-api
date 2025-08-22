// routes/admin.route.ts
import { Router } from 'express';
import { approveDriver, approveRider, blockUser,  getAllDrivers,  getAllRides, getAllUsers,
     getRideReports, suspendDriver, unblockUser } from '../../modules/admin/admin.controller';
import { authenticate, authorize,  } from '../auth/auth.controller';
import { getDriverById } from '../driver/driver.controller';




const router = Router();
router.get('/users', authenticate, authorize('admin'), getAllUsers);
router.get('/drivers', authenticate, authorize('admin'), getAllDrivers);

router.patch('/drivers/:id', authenticate, authorize('admin'), getDriverById);
router.get('/rides', authenticate, authorize('admin'), getAllRides);
// routes/admin.route.ts
router.patch('/approve-driver/:id', authenticate, authorize('admin'), approveDriver);
router.patch('/suspend-driver/:id', authenticate, authorize('admin'), suspendDriver);
// routes/admin.route.ts
router.patch('/block-user/:id', authenticate, authorize('admin'), blockUser);
router.patch('/unblock-user/:id', authenticate, authorize('admin'), unblockUser);
router.patch('/approve-rider/:id', authenticate, authorize('admin'), approveRider);
// routes/admin.route.ts
router.get('/reports/rides', authenticate, authorize('admin'), getRideReports);

export default router;