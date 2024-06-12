import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MemberService } from '../services/member.service';

export interface QueryParamValues {
   display?: 'bloodType' | 'birthdate' | 'fullName' | 'zodiacSign';
}

export class MemberController {
   constructor(private memberService: MemberService) {} // eslint-disable-line

   public loadAllMembers = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      try {
         const sortMethod: QueryParamValues = {
            ...(req.query.display === 'blood' && {
               display: 'bloodType',
            }),
            ...(req.query.display === 'birthdate' && {
               display: 'birthdate',
            }),
            ...(req.query.display === 'syllabary' && {
               display: 'fullName',
            }),
            ...(req.query.display === 'constellation' && {
               display: 'zodiacSign',
            }),
         };

         if (Object.keys(sortMethod).length) {
            const allMembersSorted =
               await this.memberService.loadAllMembers(sortMethod);

            return res.status(StatusCodes.OK).json(allMembersSorted);
         }

         const allMembers = await this.memberService.loadAllMembers();

         return res.status(StatusCodes.OK).json(allMembers);
      } catch (err) {
         console.log(err);

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };

   public loadSingleMember = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      try {
         const id = parseInt(req.params.id);

         const findMemberAndPosts =
            await this.memberService.loadSingleMember(id);

         if (!findMemberAndPosts) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: 'Member not found',
            });
         }

         return res.status(StatusCodes.OK).json(findMemberAndPosts);
      } catch (err) {
         console.log(err);

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Something went wrong',
         });
      }
   };
}
