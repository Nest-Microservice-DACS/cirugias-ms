import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateCirugiaDto } from './dto/create-cirugia.dto';
import { UpdateCirugiaDto } from './dto/update-cirugia.dto';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class CirugiasService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL,
    });
    super({ adapter });
  }

  private readonly logger = new Logger('CirugiasService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createCirugiaDto: CreateCirugiaDto) {
    return 'This action adds a new cirugia';
  }

  findAll() {
    return `This action returns all cirugias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cirugia`;
  }

  update(id: number, updateCirugiaDto: UpdateCirugiaDto) {
    return `This action updates a #${id} cirugia`;
  }

  remove(id: number) {
    return `This action removes a #${id} cirugia`;
  }
}
