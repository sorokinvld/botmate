import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('mods')
@Controller('mods')
export class ModerationsController {}
