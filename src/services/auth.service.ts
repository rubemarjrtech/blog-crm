import { User } from '../database/models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Admin } from '../database/models/admin.model';

export interface DecodedUser
   extends Omit<User, 'member' | 'newid' | 'password'> {}

export interface DecodedAdmin extends Omit<Admin, 'password'> {}
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

   public static generateUserToken(payload: object): string {
      return jwt.sign(payload, 'mysecret', { expiresIn: '5D' });
   }

   public static generateAdminToken(payload: object): string {
      return jwt.sign(payload, 'secret', { expiresIn: '5D' });
   }

   public static validateUserToken(token: string): DecodedUser {
      return jwt.verify(token, 'mysecret') as DecodedUser;
   }

   public static validateAdminToken(token: string): DecodedAdmin {
      return jwt.verify(token, 'secret') as DecodedAdmin;
   }
}
