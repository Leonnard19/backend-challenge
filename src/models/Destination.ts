import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('destinations')
export default class Destination {
  @PrimaryColumn()
  id: string;

  @Column()
  country: string;

  @Column()
  location: string;

  @Column()
  meta: string;

  @Column()
  flag_url: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}
