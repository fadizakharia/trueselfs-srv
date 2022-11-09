import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import {
  relationshipStatus,
  relationshipTypes,
} from '../../constants/relationship-status';
import { subscriptions, TSubscriptions } from '../../constants/subscriptions';
import { genders } from '../../constants/user-gender';
import { Interests } from './interests.entity';

@Entity()
export class User {
  @PrimaryColumn({ generated: 'uuid', type: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  biography: string;

  @OneToMany(() => Interests, (interest) => interest.user)
  @JoinColumn({ name: 'hobbies' })
  hobbies: Array<Interests>;

  @Column({ type: 'text', enum: subscriptions, default: 'basic' })
  type: TSubscriptions;

  @Column({ type: 'text', enum: genders })
  gender: genders;

  @Column({ name: 'other_gender', type: 'text' })
  otherGender: string;

  @Column({
    name: 'relationship_status',
    type: 'text',
    enum: relationshipStatus,
  })
  relationshipStatus: relationshipTypes;
}
