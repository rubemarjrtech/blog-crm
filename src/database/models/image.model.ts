import {
   PrimaryGeneratedColumn,
   Column,
   Entity,
   Index,
   JoinColumn,
   ManyToOne,
} from 'typeorm';
import { Post } from './post.model';

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
   post_id!: number;

   @ManyToOne(() => Post, (post) => post.images)
   @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
   post!: Post;
}
