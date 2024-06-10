import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { memberRepository } from '../database/repositories/member.repository';
import { Post } from '../database/models/post.model';
import { imageRepository } from '../database/repositories/image.repository';
import { MemberService } from '../services/member.service';

export interface QueryParamValues {
   display: 'blood' | 'birthdate' | 'syllabary' | 'constellation';
}

export class MemberController {
   constructor(private memberService: MemberService) {} // eslint-disable-line

   public loadAllMembers = async (
      req: Request,
      res: Response,
   ): Promise<Response> => {
      try {
         const sortMethod: Record<string, unknown> = {
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

   public async loadSingleMember(req: Request, res: Response) {
      const id = parseInt(req.params.id);

      const findMemberAndPosts = await memberRepository
         .createQueryBuilder('member')
         .leftJoinAndSelect(
            (qb) =>
               qb
                  .select()
                  .from(Post, 'p')
                  .where('p.member_id = :id', { id })
                  .orderBy({ 'p.created_at': 'DESC' })
                  .limit(4),
            'p',
            'p.member_id = member.id',
         )
         .where('member.id = :id', { id })
         .getRawMany();

      const ids: number[] = [];

      for (const item of findMemberAndPosts) {
         ids.push(item.id);
      }

      const imagesFromPosts = await imageRepository
         .createQueryBuilder('images')
         .where('images.post_id IN (:...post_id)', {
            post_id: ids,
         })
         .getMany();

      res.status(StatusCodes.OK).json({
         findMemberAndPosts,
         imagesFromPosts,
      });
   }
}
