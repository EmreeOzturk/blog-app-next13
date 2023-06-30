import jwt from 'jsonwebtoken';

export const signJwtToken = (payload: any, options?: jwt.SignOptions) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  if (!payload) throw new Error('Payload cannot be empty');
  options = options || { expiresIn: '1h' };
  const token = jwt.sign(payload, secret, options);
  return token;
};

export const verifyJwtToken = (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  if (!token) throw new Error('Token cannot be empty');
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.error(error);
    throw new Error('Invalid or expired token');
  }
};
