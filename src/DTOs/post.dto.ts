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

export const loadAllPostsSchema = {
   ct: z
      .string({
         invalid_type_error: 'Invalid data',
      })
      .optional(),
   page: z
      .string({
         invalid_type_error: 'Invalid data',
      })
      .optional(),
};

const loadAllPostsObject = z.object(loadAllPostsSchema);

export type loadAllPostsDTO = z.infer<typeof loadAllPostsObject>;
