import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './auth.entity';

@Entity()
export class Interests {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;
  @Column({ name: 'interest_name', type: 'text', length: '70' })
  interestName: string;
  @ManyToOne(() => User, (user) => user.hobbies)
  user: User;
}
