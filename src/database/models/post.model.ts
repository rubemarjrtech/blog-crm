import {
   PrimaryGeneratedColumn,
   Column,
   Entity,
   CreateDateColumn,
   OneToMany,
   ManyToOne,
   JoinColumn,
   Index,
} from 'typeorm';
import { Member } from './member.model';
import { Comment } from './comment.model';

export enum Status {
   AWAITING = 'waiting for approval',
   APPROVED = 'published',
}
@Entity()
export class Post {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      type: 'text',
      nullable: false,
   })
   title: string;

   @Column({
      type: 'longtext',
      nullable: false,
   })
   body: string;

   @Column({
      type: 'text',
      nullable: true,
   })
   thumbnail: string;

   @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
   })
   createdAt: Date;

   @Column({ default: Status.AWAITING })
   status: string;

   @Column()
   @Index()
   memberId!: number;

   @ManyToOne(() => Member, (member) => member.posts)
   @JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
   member!: Member;

   @OneToMany(() => Comment, (comment) => comment.post)
   comments!: Comment[];
}
