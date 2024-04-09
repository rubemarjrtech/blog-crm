import { Request, Response } from 'express';
import { memberRepository } from '../database/repositories/member.repository';
import { StatusCodes } from 'http-status-codes';

export class MemberController {
   async loadAllMembers(req: Request, res: Response) {
      const sort: Record<string, unknown> = {
         ...(req.query.display === 'blood' && {
            blood_type: 'ASC',
         }),
         ...(req.query.display === 'birthdate' && {
            birthdate: 'ASC',
         }),
         ...(req.query.display === 'name' && {
            full_name: 'ASC',
         }),
         ...(req.query.display === 'zs' && {
            zodiac_sign: 'ASC',
         }),
      };

      const listMembers = await memberRepository.find({
         order: sort,
      });

      const members = listMembers.map((currentMember) => {
         const currentMemberDetails = {
            id: currentMember.id,
            full_name: currentMember.full_name,
            image_url: currentMember.image_url,
         };

         return currentMemberDetails;
      });

      return res.status(StatusCodes.OK).json({
         members,
      });
   }
}
