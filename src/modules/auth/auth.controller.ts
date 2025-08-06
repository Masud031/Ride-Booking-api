import { Request, Response, NextFunction } from 'express';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

// Middleware to authenticate JWT token and attach user info to request
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded === 'object' &&
      'id' in decoded &&
      'role' in decoded
    ) {
      req.user = {
        id: (decoded as JwtPayload).id as string,
        role: (decoded as JwtPayload).role as string,
      };
      return next();
    }

    return res.status(403).json({ error: 'Invalid token payload' });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Signup controller
export const signup = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json({ message: 'Signup successful', user });
  } catch (error) {
    return res.status(400).json({ error: 'Signup failed', details: error });
  }
};

// Login controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

     if (user.isBlocked) {
      return res.status(403).json({ error: 'User is blocked' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

      const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    return res.status(200).json({ token, user });
  } catch (error: any) {
  console.error('Login error:', error);
  res.status(500).json({
    error: 'Login error',
    details: error.message || error,
  });
}

};
