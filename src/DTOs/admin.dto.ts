import { z } from 'zod';

export const adminLoginSchema = {
   username: z.string({
      required_error: 'username is required',
      invalid_type_error: 'invalid data',
   }),
   password: z.string({
      required_error: 'password is required',
      invalid_type_error: 'invalid data',
   }),
};

const adminLoginObject = z.object(adminLoginSchema);

export type AdminLoginDTO = z.infer<typeof adminLoginObject>;
