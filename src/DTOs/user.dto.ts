import { z } from 'zod';

export const userLoginSchema = {
   username: z.string({
      required_error: 'username is required',
      invalid_type_error: 'invalid data',
   }),
   password: z.string({
      required_error: 'password is required',
      invalid_type_error: 'invalid data',
   }),
};

const userLoginObject = z.object(userLoginSchema);

export type UserLoginDTO = z.infer<typeof userLoginObject>;
