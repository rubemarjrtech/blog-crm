import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Member } from '../database/models/member.model';

export class MemberSeeder implements Seeder {
   async run(dataSource: DataSource): Promise<void> {
      const memberRepository = await dataSource.getRepository(Member);

      const memberData = {
         full_name: 'mukai itoha',
         zodiac_sign: 'pisces',
         birthdate: '20/10/2002',
         height: 161.3,
         birthplace: 'hiroshima',
         blood_type: 'A',
         image_url: 'url.imagem.com',
      };

      const alreadyExists = await memberRepository.findOne({
         where: {
            full_name: memberData.full_name,
         },
      });

      if (!alreadyExists) {
         const newMember = await memberRepository.create(memberData);

         await memberRepository.save(newMember);
      }
   }
}
