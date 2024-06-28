import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Admin {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      unique: true,
      length: '250',
      nullable: false,
   })
   username: string;

   @Column({
      length: '450',
      nullable: false,
   })
   password: string;

   @Column({
      default: 'manager',
   })
   role: string;
}
