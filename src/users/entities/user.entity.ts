import { Qr } from 'src/qrs/entities/qr.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grade: string;

  @Column()
  specialty: string;

  @Column()
  dni: string;

  @Column()
  cip: string;

  @Column()
  area: string;

  @Column({ nullable: true })
  photo_url: string;

  @OneToMany(() => Qr, (qr) => qr.user)
  qrs: Qr[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
