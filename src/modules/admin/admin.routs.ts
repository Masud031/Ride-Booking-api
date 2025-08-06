// routes/admin.route.ts
import { Router } from 'express';
import { approveDriver, blockUser, getAllUsers,
     getRideReports, suspendDriver, unblockUser } from '../../modules/admin/admin.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
// import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();
router.get('/users', authenticate, authorize('admin'), getAllUsers);
// routes/admin.route.ts
router.patch('/approve-driver/:id', authenticate, authorize('admin'), approveDriver);
router.patch('/suspend-driver/:id', authenticate, authorize('admin'), suspendDriver);
// routes/admin.route.ts
router.patch('/block-user/:id', authenticate, authorize('admin'), blockUser);
router.patch('/unblock-user/:id', authenticate, authorize('admin'), unblockUser);

// routes/admin.route.ts
router.get('/reports/rides', authenticate, authorize('admin'), getRideReports);
