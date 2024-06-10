import { appDataSource } from '../../data-source';
import { Member } from '../models/member.model';

export const memberRepository = appDataSource.getRepository(Member);

export class MemberRepository {
   constructor(private memberModel = memberRepository) {} // eslint-disable-line

   public async loadAllMembers(
      sortMethod?: Record<string, unknown>,
   ): Promise<Member[]> {
      if (sortMethod) {
         const allMembers = await this.memberModel
            .createQueryBuilder('member')
            .select(['member.id', 'member.imageUrl', 'member.fullName'])
            .orderBy(`${sortMethod.display}`, 'ASC')
            .getMany();

         return allMembers;
      }

      const allMembers = await this.memberModel
         .createQueryBuilder('member')
         .select(['member.id', 'member.imageUrl', 'member.fullName'])
         .getMany();

      return allMembers;
   }
}
