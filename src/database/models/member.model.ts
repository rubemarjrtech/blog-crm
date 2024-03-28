import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Post } from './post.model';

@Entity()
export class Member {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      length: '65',
      nullable: false,
   })
   full_name: string;

   @Column({
      nullable: true,
   })
   zodiac_sign: string;

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
   blood_type: string;

   @Column({
      length: '500',
      nullable: true,
   })
   image_url: string;

   @OneToMany(() => Post, (posts) => posts.member)
   posts!: Post[];
}
