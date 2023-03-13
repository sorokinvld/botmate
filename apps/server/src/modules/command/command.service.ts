import { Command } from '@/entities';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BotRestartEvent } from '../bot/events/bot-restart.event';
import { SettingsService } from '../settings/settings.service';
import { CreateCommandDTO } from './dto/create-command.dto';
import { UpdateCommandDTO } from './dto/update-command.dto';

@Injectable()
export class CommandService {
  constructor(
    @InjectRepository(Command)
    private readonly cmdRepo: Repository<Command>,
    private readonly settingsService: SettingsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createCommand(command: CreateCommandDTO) {
    const newCommand = this.cmdRepo.create({
      ...command,
      createdAt: new Date().toISOString(),
    });

    return this.cmdRepo.save(newCommand);
  }

  async getCommandById(id: number) {
    return this.cmdRepo.findOne({
      where: { id },
    });
  }

  async updateCommand(id: number, command: UpdateCommandDTO) {
    const commandData = await this.cmdRepo.findOne({
      select: { bot: { id: true } },
      where: { id },
      relations: ['bot'],
    });
    this.eventEmitter.emit(
      'bot.restart',
      new BotRestartEvent(commandData.bot.id),
    );

    return this.cmdRepo.update(
      { id },
      { ...command, updatedAt: new Date().toISOString() },
    );
  }

  async getCommandsByBotId(botId: string) {
    const commands = await this.cmdRepo.find({
      where: {
        bot: {
          id: botId,
        },
      },
    });

    return commands;
  }

  async findCommand(botId: string, command: string) {
    const cmd = await this.cmdRepo.findOne({
      where: {
        bot: {
          id: botId,
        },
        command,
      },
    });

    return cmd;
  }

  async findAllCommands(botId: string) {
    const commands = await this.cmdRepo.find({
      where: {
        bot: {
          id: botId,
        },
      },
    });

    return commands;
  }
}
