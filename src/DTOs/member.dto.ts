import { z } from 'zod';

export const loadAllMembersSchema = {
   display: z
      .enum(['bloodType', 'birthdate', 'fullName', 'zodiacSign'])
      .optional(),
};

const loadAllMembersObject = z.object(loadAllMembersSchema);

export type loadAllMembersDTO = z.infer<typeof loadAllMembersObject>;
