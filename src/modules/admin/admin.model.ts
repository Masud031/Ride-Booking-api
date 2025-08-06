// import { Schema, model, Document } from 'mongoose';
// import bcrypt from 'bcrypt';

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   role: 'admin' | 'rider' | 'driver';
//   isApproved?: boolean; // for drivers
//   isBlocked?: boolean; // for all users
//   vehicleInfo?: string; // for drivers
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const userSchema = new Schema<IUser>(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['admin', 'rider', 'driver'], default: 'rider' },
    
//     // Admin-related controls
//     isApproved: { type: Boolean, default: false }, // Only for drivers
//     isBlocked: { type: Boolean, default: false },  // Any user can be blocked
    
//     // Driver-specific
//     vehicleInfo: { type: String, required: function () { return this.role === 'driver'; } }
//   },
//   { timestamps: true }
// );

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Compare password method
// userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// export const User = model<IUser>('User', userSchema);
