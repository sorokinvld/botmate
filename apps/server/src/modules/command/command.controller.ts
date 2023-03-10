import { Command } from '@/entities';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommandService } from './command.service';
import { CreateCommandDTO } from './dto/create-command.dto';
import { UpdateCommandDTO } from './dto/update-command.dto';

class CommandGetApiResponse extends OmitType(Command, ['bot']) {}

@UseGuards(JwtAuthGuard)
@ApiTags('command')
@Controller('/commands')
export class CommandController {
  constructor(private readonly cmdService: CommandService) {}

  @ApiOkResponse({
    type: [CommandGetApiResponse],
  })
  @ApiQuery({
    name: 'botId',
    required: true,
  })
  @Get()
  async getCommands(@Query('botId') botId: string) {
    return this.cmdService.getCommandsByBotId(botId);
  }

  @ApiResponse({
    type: Command,
  })
  @Post()
  async createCommand(@Body() commandData: CreateCommandDTO) {
    try {
      const newCmd = await this.cmdService.createCommand(commandData);
      return newCmd;
    } catch (e) {
      throw new BadRequestException(
        'An error occurred while creating the command.',
      );
    }
  }

  @ApiResponse({
    type: Command,
  })
  @Get(':id')
  async getCommandById(@Param('id') id: number) {
    return this.cmdService.getCommandById(id);
  }

  @ApiResponse({
    type: Command,
  })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @Put(':id')
  async updateCommand(
    @Param('id') id: number,
    @Body() commandData: UpdateCommandDTO,
  ) {
    console.log('commandData', commandData);
    try {
      const updatedCmd = await this.cmdService.updateCommand(id, commandData);
      return updatedCmd;
    } catch (e) {
      throw new BadRequestException(
        'An error occurred while updating the command.',
      );
    }
  }
}
