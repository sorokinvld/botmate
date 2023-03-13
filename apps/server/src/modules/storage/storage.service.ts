import { Storage } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage) private storageRepository: Repository<Storage>,
  ) {}

  async get<T>(key: string, defaultValue?: T): Promise<T> {
    return this.storageRepository
      .findOne({ where: { key } })
      .then((s) => s?.value ?? defaultValue);
  }

  async set<T>(key: string, value: T): Promise<void> {
    const exist = await this.storageRepository.findOne({ where: { key } });
    if (exist) {
      exist.value = value;
      await this.storageRepository.save(exist);
    } else {
      const storage = this.storageRepository.create({ key, value });
      await this.storageRepository.save(storage);
    }
  }
}
