import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateCirugiaDto } from './dto/create-cirugia.dto';
import { UpdateCirugiaDto } from './dto/update-cirugia.dto';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PaginationDto } from 'src/common';
import { skip } from '@prisma/client/runtime/client';

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
    return this.cirugia.create({ data: createCirugiaDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { size = 10, page = 1 } = paginationDto;

    const totalPages = await this.cirugia.count();
    const lastPage = Math.ceil(totalPages / size);

    return {
      data: await this.cirugia.findMany({
        take: size,
        skip: (page - 1) * size,
      }),
      meta: {
        size,
        page,
        lastPage,
      },
    };
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
