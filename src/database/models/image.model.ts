import {
   PrimaryGeneratedColumn,
   Column,
   Entity,
   Index,
   ManyToOne,
   JoinColumn,
} from 'typeorm';
import { Member } from './member.model';

@Entity()
export class Image {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({
      type: 'text',
      nullable: false,
   })
   path: string;

   @Column()
   @Index()
   memberId!: number;

   @ManyToOne(() => Member, (member) => member.images)
   @JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
   member!: Member;
}
