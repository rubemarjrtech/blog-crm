import { Member } from '../database/models/member.model';
import {
   MemberRepository,
   MemberPosts,
} from '../database/repositories/member.repository';

export class MemberService {
   constructor(private memberRepository: MemberRepository) {} // eslint-disable-line

   public async loadAllMembers(sortMethod?: string): Promise<Member[]> {
      const allMember = await this.memberRepository.loadAllMembers(sortMethod);

      return allMember;
   }

   public async loadSingleMember(id: number): Promise<MemberPosts | null> {
      const member = await this.memberRepository.loadSingleMember(id);

      return member;
   }
}
