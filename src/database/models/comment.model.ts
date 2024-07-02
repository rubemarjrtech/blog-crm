import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToOne,
   JoinColumn,
   Index,
   CreateDateColumn,
} from 'typeorm';
import { Post, Status } from './post.model';

@Entity()
export class Comment {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({
      length: '450',
      nullable: false,
   })
   name: string;

   @Column({
      length: '650',
      nullable: true,
   })
   email: string;

   @Column({
      nullable: true,
      length: '650',
   })
   url: string;

   @Column({
      type: 'longtext',
      nullable: false,
   })
   comment: string;

   @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
   })
   createdAt: Date;

   @Column({
      default: Status.AWAITING,
   })
   status: string;

   @Column()
   @Index()
   postId!: number;

   @ManyToOne(() => Post, (post) => post.comments)
   @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
   post!: Post;
}
