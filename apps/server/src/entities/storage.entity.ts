import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Storage {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column()
  key: string;

  @ApiProperty({
    type: 'object',
    description: 'JSON object',
  })
  @Column({ type: 'json' })
  value: any;
}
