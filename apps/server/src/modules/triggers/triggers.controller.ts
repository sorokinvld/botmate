import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTriggerDto } from './dto/create-trigger.dto';

@ApiTags('triggers')
@Controller('triggers')
export class TriggersController {
  @Post()
  create(@Body() body: CreateTriggerDto) {
    return body;
  }
}
