import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Post } from './post.model';
import { Image } from './image.model';

@Entity()
export class Member {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      length: '65',
      nullable: false,
   })
   fullName: string;

   @Column({
      length: '50',
      nullable: true,
   })
   zodiacSign: string;

   @Column({
      nullable: false,
   })
   birthdate: string;

   @Column('decimal', { precision: 5, scale: 2, nullable: false })
   height: number;

   @Column({
      length: '65',
      nullable: false,
   })
   birthplace: string;

   @Column({
      length: '10',
      nullable: false,
   })
   bloodType: string;

   @Column({
      length: '500',
      nullable: true,
   })
   imageUrl: string;

   @OneToMany(() => Post, (posts) => posts.member)
   posts!: Post[];

   @OneToMany(() => Image, (images) => images.member)
   images!: Image[];
}
