import {
   BeforeInsert,
   Column,
   Entity,
   JoinColumn,
   OneToOne,
   PrimaryColumn,
} from 'typeorm';
import { Member } from './member.model';

@Entity()
export class User {
   @PrimaryColumn()
   userId!: number;

   @OneToOne(() => Member, { cascade: true })
   @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
   member: Member;

   @BeforeInsert()
   newid() {
      this.userId = this.member.id;
   }

   @Column({
      length: '250',
      nullable: false,
   })
   username: string;

   @Column({
      length: '450',
      nullable: false,
   })
   password: string;
}
