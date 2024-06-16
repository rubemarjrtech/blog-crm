import { MemberRepository } from '../database/repositories/member.repository';
import { MemberService } from '../services/member.service';

export class MemberFactory {
   private static memberService: MemberService;

   public static getServiceInstance(): MemberService {
      if (this.memberService) {
         return this.memberService;
      }

      const memberRepository = new MemberRepository();
      const memberService = new MemberService(memberRepository);

      this.memberService = memberService;

      return memberService;
   }
}
