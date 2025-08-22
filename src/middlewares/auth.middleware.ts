// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';

// // const JWT_SECRET = process.env.JWT_SECRET as string;

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   const JWT_SECRET = process.env.JWT_SECRET as string;
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//       console.log('✅ Token verified:', decoded);
//     // Type guard: ensure it's an object with id and role
//     if (
//       typeof decoded === 'object' &&
//       decoded !== null &&
//       'id' in decoded &&
//       'role' in decoded
//     ) {
//       req.user = {
//         id: (decoded as JwtPayload).id as string,
//         role: (decoded as JwtPayload).role as string,
//       };
//       return next();
//     }
// console.warn('❌ Invalid token payload structure:', decoded);
//     return res.status(403).json({ error: 'Invalid token payload' });
//   } catch (error) {
//   console.error('❌ JWT verification error:', error);
//   return res.status(403).json({ error: 'Invalid token', message: (error as Error).message });
// }
// };

// export const authorize =
//   (...roles: string[]) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     const userRole = (req.user as any)?.role;
//     if (!roles.includes(userRole)) {
//       return res.status(403).json({ error: 'Access denied' });
//     }
//     next();
//   };