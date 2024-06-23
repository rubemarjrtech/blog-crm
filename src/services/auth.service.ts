import { User } from '../database/models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface DecodedUser
   extends Omit<User, 'member' | 'newid' | 'password'> {}

export default class AuthService {
   public static async hashPassword(
      password: string,
      salt = 10,
   ): Promise<string> {
      return await bcrypt.hash(password, salt);
   }

   public static async comparePassword(
      password: string,
      hashedPassword: string,
   ): Promise<boolean> {
      return await bcrypt.compare(password, hashedPassword);
   }

   public static generateToken(payload: object): string {
      return jwt.sign(payload, 'mysecret', { expiresIn: '5D' });
   }

   public static validateToken(token: string): DecodedUser {
      return jwt.verify(token, 'mysecret') as DecodedUser;
   }
}
