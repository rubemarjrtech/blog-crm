import { QueryParamValues } from '../../controllers/member.controller';
import { appDataSource } from '../../data-source';
import { Member } from '../models/member.model';
import { Post } from '../models/post.model';

export const memberRepository = appDataSource.getRepository(Member);

export type MemberPostsQueryTypes = Partial<Member> & Partial<Post>;

export type MemberPosts = {
   member: Partial<Member>;
   posts: Partial<Post>[];
};
export class MemberRepository {
   constructor(private memberModel = memberRepository) {} // eslint-disable-line

   public async loadAllMembers(
      sortMethod?: QueryParamValues,
   ): Promise<Member[]> {
      if (sortMethod) {
         const allMembersOrdered = await this.OrderAllMembers(sortMethod);

         return allMembersOrdered;
      }

      const allMembers = await this.memberModel
         .createQueryBuilder('member')
         .select(['member.id', 'member.imageUrl', 'member.fullName'])
         .getMany();

      return allMembers;
   }

   private async OrderAllMembers(
      sortMethod: QueryParamValues,
   ): Promise<Member[]> {
      const allMembers = await this.memberModel
         .createQueryBuilder('member')
         .select(['member.id', 'member.imageUrl', 'member.fullName'])
         .orderBy(`${sortMethod.display}`, 'ASC')
         .getMany();

      return allMembers;
   }

   public async loadSingleMember(id: number): Promise<MemberPosts | null> {
      const query: MemberPostsQueryTypes[] = await this.memberModel
         .createQueryBuilder('member')
         .innerJoin(
            (qb) =>
               qb
                  .select()
                  .from(Post, 'p')
                  .where('p.memberId = :id', { id })
                  .orderBy({ 'p.createdAt': 'DESC' })
                  .limit(4),
            'p',
            'p.memberId = member.id',
         )
         .select([
            'member.*',
            'p.id',
            'p.title',
            'p.body',
            'p.createdAt',
            'p.thumbnail',
         ])
         .where('member.id = :id', { id })
         .getRawMany();

      if (!query) {
         return null;
      }

      const memberAndPosts = this.normalizeLoadSingleMember(query);

      return memberAndPosts;
   }

   private normalizeLoadSingleMember(
      memberAndPosts: MemberPostsQueryTypes[],
   ): MemberPosts {
      const normalizedResponse: MemberPosts = {
         member: {
            fullName: '',
            birthdate: '',
            height: 0,
            birthplace: '',
            bloodType: '',
            imageUrl: '',
            zodiacSign: '',
         },
         posts: [],
      };

      let index = 0;

      for (const item of memberAndPosts) {
         if (!normalizedResponse.member.fullName) {
            normalizedResponse.member.fullName = item.fullName;
         }
         if (!normalizedResponse.member.birthdate) {
            normalizedResponse.member.birthdate = item.birthdate;
         }
         if (!normalizedResponse.member.height) {
            normalizedResponse.member.height = item.height;
         }
         if (!normalizedResponse.member.birthplace) {
            normalizedResponse.member.birthplace = item.birthplace;
         }
         if (!normalizedResponse.member.bloodType) {
            normalizedResponse.member.bloodType = item.bloodType;
         }
         if (!normalizedResponse.member.imageUrl) {
            normalizedResponse.member.imageUrl = item.imageUrl;
         }
         if (!normalizedResponse.member.zodiacSign) {
            normalizedResponse.member.zodiacSign = item.zodiacSign;
         }

         if (!normalizedResponse.posts[index]) {
            normalizedResponse.posts[index] = {
               id: item.id,
               title: item.title,
               body: item.body,
               thumbnail: item.thumbnail,
               createdAt: item.createdAt,
            };
         }

         index++;
      }

      return normalizedResponse;
   }
}
