import { Router } from 'express';
import { MemberController } from '../controllers/member.controller';
import { MemberFactory } from '../factory/member.factory';
import { QueryType, validator } from '../middlewares/validation.middleware';
import { loadAllMembersSchema } from '../DTOs/member.dto';

const memberController = new MemberController(
   MemberFactory.getServiceInstance(),
);

export const memberRoutes = Router();

memberRoutes.get(
   '/',
   validator({ schema: loadAllMembersSchema, type: QueryType.QUERY }),
   memberController.loadAllMembers,
);
memberRoutes.get('/:id', memberController.loadSingleMember);
