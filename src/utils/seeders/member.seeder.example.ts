import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Member } from '../../database/models/member.model';
import bcrypt from 'bcrypt';
import { Users } from '../../database/models/users.model';

export class MemberSeeder implements Seeder {
   async run(dataSource: DataSource): Promise<void> {
      const memberRepository = dataSource.getRepository(Member);
      const userRepository = dataSource.getRepository(Users);

      const memberData = {
         fullName: '',
         zodiacSign: '',
         birthdate: '',
         height: 0,
         birthplace: '',
         bloodType: '',
         imageUrl: '',
      };

      const alreadyExists = await memberRepository.findOne({
         where: {
            fullName: memberData.fullName,
         },
      });

      if (!alreadyExists) {
         const newMember = memberRepository.create(memberData);

         const memberLoginData = {
            username: '',
            password: await bcrypt.hash('', 10),
            member: newMember,
         };

         const newUser = userRepository.create(memberLoginData);

         await userRepository.save(newUser);
      }
   }
}
