import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   sessionOwnerId: number;

   @Column()
   username: string;
}
