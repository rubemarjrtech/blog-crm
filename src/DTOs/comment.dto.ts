import { z } from 'zod';

export const createCommentSchema = {
   name: z.string({
      invalid_type_error: 'Invalid data',
      required_error: 'name is required',
   }),
   email: z
      .string({
         invalid_type_error: 'Invalid data',
      })
      .email()
      .optional(),
   url: z
      .string({
         invalid_type_error: 'Invalid data',
      })
      .optional(),
   comment: z.string({
      invalid_type_error: 'Invalid data',
      required_error: 'comment is required',
   }),
};

const createCommentObject = z.object(createCommentSchema);

export type createCommentDTO = z.infer<typeof createCommentObject>;
