import { User } from '@/entities/user.entity';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BotService } from './bot.service';
import { GetBotsDTO } from './dto/get-bots.dto';

@ApiTags('bot')
@Controller('bots')
export class BotController {
  constructor(private botService: BotService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Get all bots',
    type: [GetBotsDTO],
  })
  async getBots(@Req() req: Request) {
    const user = req.user as User;
    const bots = await this.botService.getBotsByUserId(user.id);
    // sleep 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return bots;
  }
}
