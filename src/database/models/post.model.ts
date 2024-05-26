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
import { Image } from './image.model';
import { Member } from './member.model';
import { Comment } from './comment.model';

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
   created_at: Date;

   @Column()
   @Index()
   member_id!: number;

   @ManyToOne(() => Member, (member) => member.posts)
   @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
   member!: Member;

   @OneToMany(() => Image, (image) => image.post)
   images!: Image[];

   @OneToMany(() => Comment, (comment) => comment.post)
   comments!: Comment[];
}
