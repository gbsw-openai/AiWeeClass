import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { MessageEntity } from "./message.entity";

@Entity('Room')
export class RoomEntity extends BaseEntity{

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { unique: false, nullable: false })
  name: string;

  @Column({
    name: 'user_id',
    type: 'integer',
    nullable: false
  })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.rooms, { onDelete: 'CASCADE', eager: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => MessageEntity, (message) => message.room, { onDelete: 'CASCADE' })  // onDelete: 'CASCADE' 추가
  messages: MessageEntity[];
}
