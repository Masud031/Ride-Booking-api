import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db';
import authRoutes from './modules/auth/auth.routes';
import rideRoutes from './modules/ride/ride.routes';
import driverRoutes from './modules/driver/driver.routes';
import  adminRoutes from './modules/admin/admin.routs';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/rides', rideRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Ride Booking API is running...');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
connectDB();
