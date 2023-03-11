import { FilterType } from '@/entities/filter.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SaveFilterDTO {
  @ApiProperty({
    enum: FilterType,
  })
  type: FilterType;

  @ApiProperty({
    type: 'json',
  })
  value: any;
}
