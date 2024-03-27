import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Admin {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      unique: true,
      length: '45',
      nullable: false,
   })
   username: string;

   @Column({
      length: '200',
      nullable: false,
   })
   password: string;
}
