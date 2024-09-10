import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Admin } from '../database/models/admin.model';
import 'dotenv/config';

export interface UserPayload {
   userId: number;
   username: string;
   sessionId: string;
}

export interface UserSessionPayload {
   sessionId: string;
   username: string;
   userId: number;
}

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

   public static generateUserAccessToken(payload: UserPayload): string {
      return jwt.sign(payload, process.env.SECRET_ACCESS_USER as string, {
         expiresIn: '10s',
      });
   }

   public static generateUserRefreshToken(payload: UserSessionPayload): string {
      return jwt.sign(payload, process.env.SECRET_REFRESH_USER as string, {
         expiresIn: '1D',
      });
   }

   public static generateAdminToken(payload: object): string {
      return jwt.sign(payload, 'secret', { expiresIn: '5D' });
   }

   public static validateUserAccessToken(token: string): UserPayload {
      return jwt.verify(
         token,
         process.env.SECRET_ACCESS_USER as string,
      ) as UserPayload;
   }

   public static validateUserRefreshToken(token: string): UserPayload {
      return jwt.verify(
         token,
         process.env.SECRET_REFRESH_USER as string,
      ) as UserPayload;
   }

   public static validateAdminToken(token: string): DecodedAdmin {
      return jwt.verify(token, 'secret') as DecodedAdmin;
   }
}
