import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string; // ADICIONAR como opcional via migration

  @Column()
  city_id: number;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
