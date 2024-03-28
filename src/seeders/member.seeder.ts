import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Member } from '../database/models/member.model';

export class MemberSeeder implements Seeder {
   async run(dataSource: DataSource): Promise<void> {
      const memberRepository = dataSource.getRepository(Member);

      const memberData = {
         full_name: 'ishimori rika',
         zodiac_sign: 'bull',
         birthdate: '13/01/2002',
         height: 158.2,
         birthplace: 'gunma',
         blood_type: 'B',
         image_url: 'ndfsiapisa',
      };

      const newMember = memberRepository.create(memberData);

      await memberRepository.save(newMember);
   }
}
