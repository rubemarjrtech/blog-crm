import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export interface UserPayload {
   userId: number;
   username: string;
   sessionId: string;
}
export interface AdminPayload {
   adminId: number;
   username: string;
   sessionId: string;
}

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

   public static generateUserRefreshToken(payload: UserPayload): string {
      return jwt.sign(payload, process.env.SECRET_REFRESH_USER as string, {
         expiresIn: '1D',
      });
   }

   public static generateAdminAccessToken(payload: AdminPayload): string {
      return jwt.sign(payload, process.env.SECRET_ACCESS_ADMIN as string, {
         expiresIn: '15s',
      });
   }

   public static generateAdminRefreshToken(payload: AdminPayload): string {
      return jwt.sign(payload, process.env.SECRET_REFRESH_ADMIN as string, {
         expiresIn: '1D',
      });
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

   public static validateAdminAccessToken(token: string): AdminPayload {
      return jwt.verify(
         token,
         process.env.SECRET_ACCESS_ADMIN as string,
      ) as AdminPayload;
   }

   public static validateAdminRefreshToken(token: string): AdminPayload {
      return jwt.verify(
         token,
         process.env.SECRET_REFRESH_ADMIN as string,
      ) as AdminPayload;
   }
}
