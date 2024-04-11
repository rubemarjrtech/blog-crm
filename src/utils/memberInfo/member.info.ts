import { appDataSource } from '../../data-source';
import { Member } from '../../database/models/member.model';
import { memberRepository } from '../../database/repositories/member.repository';

type MemberProps = {
   id: number;
   full_name: string;
   image_url: string;
};

export async function PostOwnerInfo(id: number): Promise<MemberProps | null> {
   try {
      const member = await appDataSource.manager.findOneBy(Member, {
         id, // eslint-disable-line camelcase
      });

      const singleMemberDetails = {
         id: member!.id,
         full_name: member!.full_name,
         image_url: member!.image_url,
      };

      return singleMemberDetails;
   } catch (err) {
      return null;
   }
}

export async function AllMembersInfo(): Promise<MemberProps[] | null> {
   try {
      const members = await memberRepository
         .createQueryBuilder('members')
         .orderBy('full_name', 'ASC')
         .getMany();

      const membersDetails = members.map((currentMember) => {
         const currentMemberDetails = {
            id: currentMember.id,
            full_name: currentMember.full_name,
            image_url: currentMember.image_url,
         };

         return currentMemberDetails;
      });

      return membersDetails;
   } catch (err) {
      return null;
   }
}
