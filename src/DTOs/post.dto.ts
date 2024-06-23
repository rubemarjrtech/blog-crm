import { z } from 'zod';

export const createPostSchema = {
   title: z.string({
      required_error: 'title is required',
   }),
   body: z.string({
      required_error: 'body is required',
   }),
   thumbnail: z
      .string({
         invalid_type_error: 'must be a url',
      })
      .optional(),
};

const createPostObject = z.object(createPostSchema);

export type createPostDTO = z.infer<typeof createPostObject>;
