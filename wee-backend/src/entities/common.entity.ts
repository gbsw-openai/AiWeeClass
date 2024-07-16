import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  export class CommonBigPKEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  }
  