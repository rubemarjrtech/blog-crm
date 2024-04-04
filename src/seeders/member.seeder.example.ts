import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Member } from '../database/models/member.model';

export class MemberSeeder implements Seeder {
   async run(dataSource: DataSource): Promise<void> {
      const memberRepository = await dataSource.getRepository(Member);

      const memberData = {
         full_name: '',
         zodiac_sign: '',
         birthdate: '',
         height: 0,
         birthplace: '',
         blood_type: '',
         image_url: '',
      };

      const alreadyExists = await memberRepository.findOne({
         where: {
            full_name: memberData.full_name,
         },
      });

      if (!alreadyExists) {
         const newMember = memberRepository.create(memberData);

         await memberRepository.save(newMember);
      }
   }
}
