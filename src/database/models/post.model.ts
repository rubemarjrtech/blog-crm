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

@Entity()
export class Post {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      type: 'text',
      nullable: false,
      length: '650',
   })
   title: string;

   @Column({
      type: 'longtext',
      nullable: false,
      length: '6000',
   })
   body: string;

   @Column({
      type: 'text',
      nullable: true,
      length: '850',
   })
   thumbnail: string;

   @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
   })
   createdAt: Date;

   @Column()
   @Index()
   memberId!: number;

   @ManyToOne(() => Member, (member) => member.posts)
   @JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
   member!: Member;

   @OneToMany(() => Comment, (comment) => comment.post)
   comments!: Comment[];
}
