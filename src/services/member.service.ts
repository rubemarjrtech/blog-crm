import { Member } from '../database/models/member.model';
import { MemberRepository } from '../database/repositories/member.repository';

export class MemberService {
   constructor(private memberRepository: MemberRepository) {} // eslint-disable-line

   public async loadAllMembers(
      sortMethod?: Record<string, unknown>,
   ): Promise<Member[]> {
      const allMember = await this.memberRepository.loadAllMembers(sortMethod);

      return allMember;
   }
}
