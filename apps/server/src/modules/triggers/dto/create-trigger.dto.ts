import { Trigger } from '@/entities/trigger.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateTriggerDto extends OmitType(Trigger, ['id']) {}
