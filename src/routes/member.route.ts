import { Router } from 'express';
import { MemberController } from '../controllers/member.controller';
import { MemberFactory } from '../factory/member.factory';

const memberController = new MemberController(
   MemberFactory.getServiceInstance(),
);

export const memberRoutes = Router();

memberRoutes.get('/', memberController.loadAllMembers);
memberRoutes.get('/:id', memberController.loadSingleMember);
