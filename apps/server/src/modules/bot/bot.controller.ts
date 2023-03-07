import { ErrorResponse } from '@common/error.response';
import { Bot } from '@/entities/bot.entity';
import { User } from '@/entities/user.entity';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BotService } from './bot.service';
import { CreateBotDTO } from './dto/create-bot.dto';
import { GetBotsDTO } from './dto/get-bots.dto';

@ApiTags('bot')
@Controller('bots')
@UseGuards(JwtAuthGuard)
export class BotController {
  constructor(private botService: BotService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all bots',
    type: [GetBotsDTO],
  })
  async getBots(@Req() req: Request) {
    const user = req.user as User;
    const bots = await this.botService.getBotsByUserId(user.id);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return bots;
  }

  @Post()
  @ApiOkResponse({
    type: OmitType(Bot, ['user']),
  })
  @ApiResponse({
    status: 404,
    description: 'Unauthorized',
    type: ErrorResponse,
  })
  async createBot(@Req() request: Request, @Body() body: CreateBotDTO) {
    const user = request.user as User;

    try {
      const bot = await this.botService.createBot(body.token, user.id);
      return bot;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
