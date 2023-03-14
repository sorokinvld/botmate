import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  TriggerAction,
  TriggerCondition,
  triggerModes,
} from '@common/types/trigger.types';

@Entity({ name: 'triggers' })
export class Trigger {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({
    enum: triggerModes,
  })
  @Column({
    enum: triggerModes,
  })
  mode: string;

  @ApiProperty({
    type: TriggerAction,
    isArray: true,
  })
  @Column({
    type: 'jsonb',
  })
  actions: TriggerAction[];

  @ApiProperty({
    type: Array<TriggerCondition>(),
  })
  @Column({
    type: 'jsonb',
  })
  conditions: TriggerCondition[];
}
