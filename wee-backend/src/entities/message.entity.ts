import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBigPKEntity } from './common.entity';
import { UserEntity } from './user.entity';

@Entity('Message')
export class MessageEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false })
  message: string;

  @Column('varchar', { nullable: false })
  aiResponse: string;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
