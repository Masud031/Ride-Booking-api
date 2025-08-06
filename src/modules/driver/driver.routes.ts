// src/modules/driver/driver.routes.ts
import { Router } from 'express';
import { getAllDrivers, getDriverById, approveDriver, suspendDriver } from './driver.controller';

const router = Router();

// Get all drivers
router.get('/', getAllDrivers);

// Get a single driver by ID
router.get('/:id', getDriverById);

// Approve a driver
router.put('/:id/approve', approveDriver);

// Suspend a driver
router.put('/:id/suspend', suspendDriver);

export default router;
