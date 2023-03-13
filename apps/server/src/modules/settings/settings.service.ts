import { BotMateLogger } from '@/common';
import { Settings, SettingsScope } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  private logger = new BotMateLogger(SettingsService.name);

  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepo: Repository<Settings>,
  ) {}

  async load(key: string, defaultValue?: any) {
    const setting = await this.settingsRepo.findOne({ where: { key } });
    return setting ? setting.value : defaultValue;
  }

  async save(key: string, value: any, scope?: string, defaultValue?: any) {
    const exists = await this.settingsRepo.findOne({ where: { key, scope } });

    if (exists) {
      exists.value = value;
      return this.settingsRepo.save(exists).catch((err) => {
        this.logger.error("Couldn't save settings value");
        this.logger.error(err);
        return defaultValue;
      });
    }

    const setting = this.settingsRepo.create({
      key,
      value,
      scope,
    });

    if (defaultValue)
      return this.settingsRepo.save(setting).catch((err) => {
        this.logger.error("Couldn't save settings value");
        this.logger.error(err);
        return defaultValue;
      });
  }
}
