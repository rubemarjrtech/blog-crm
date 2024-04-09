import { Router } from 'express';
import { MemberController } from '../controllers/member.controller';

const memberController = new MemberController();

export const memberRoutes = Router();

memberRoutes.get('/', memberController.loadAllMembers);
