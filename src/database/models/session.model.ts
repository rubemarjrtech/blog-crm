import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   userId: number;

   @Column()
   username: string;
}
