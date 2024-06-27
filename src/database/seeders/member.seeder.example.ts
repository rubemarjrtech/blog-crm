import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Member } from '../../database/models/member.model';
import { User } from '../../database/models/user.model';
import AuthService from '../../services/auth.service';

export class MemberSeeder implements Seeder {
   async run(dataSource: DataSource): Promise<void> {
      const memberRepository = dataSource.getRepository(Member);
      const userRepository = dataSource.getRepository(User);

      const memberData = [
         // Can add more members here
         {
            fullName: '',
            zodiacSign: '',
            birthdate: '',
            height: 0,
            birthplace: '',
            bloodType: '',
            imageUrl: '',
         },
      ];

      for (const member of memberData) {
         const alreadyExists = await memberRepository.findOne({
            where: {
               fullName: member.fullName,
            },
         });

         if (!alreadyExists) {
            const newMember = memberRepository.create(member);

            // Can replace with a new logic for creating a username and password

            const userBuilder = member.fullName.split(' ').join('_');
            const passwordBuilder = member.fullName.split(' ')[0];

            const memberLoginData = {
               username: `${userBuilder}@100`,
               password: await AuthService.hashPassword(
                  `${passwordBuilder}@100member`,
               ),
               member: newMember,
            };

            const newUser = userRepository.create(memberLoginData);

            await userRepository.save(newUser);
         }
      }
   }
}
