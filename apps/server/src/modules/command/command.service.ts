import { Command } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommandDTO } from './dto/create-command.dto';
import { UpdateCommandDTO } from './dto/update-command.dto';

@Injectable()
export class CommandService {
  constructor(
    @InjectRepository(Command)
    private readonly cmdRepo: Repository<Command>,
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

  updateCommand(id: number, command: UpdateCommandDTO) {
    return this.cmdRepo.update({ id }, { ...command });
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
}
