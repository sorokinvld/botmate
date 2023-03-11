import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// this entity stores data in a key-value stucture

@Entity()
export class Moderation {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column()
  key: string;

  @ApiProperty()
  @Column()
  chatId: string;

  @ApiProperty({
    type: 'any',
  })
  @Column({ type: 'json' })
  value: any;
}
