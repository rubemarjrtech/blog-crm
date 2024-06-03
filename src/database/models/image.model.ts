import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Image {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({
      type: 'text',
      nullable: false,
      length: 650,
   })
   path: string;
}
