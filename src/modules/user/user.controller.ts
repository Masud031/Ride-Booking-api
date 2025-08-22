// import { Request, Response } from "express";
// import asyncHandler from "express-async-handler";
// import { User } from "./user.model";


// // @desc    Get all users (Admin only)
// // @route   GET /api/users
// // @access  Private/Admin
// export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
//   const users = await User.find().select("-password"); // hide password hash
//   res.json(users);
// });
