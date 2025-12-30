import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateCirugiaDto } from './dto/create-cirugia.dto';
import { UpdateCirugiaDto } from './dto/update-cirugia.dto';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PaginationDto } from 'src/common';
import { skip } from '@prisma/client/runtime/client';
import { NotFoundError } from 'rxjs';

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
        where: { estado: { not: 'cancelada' } },
      }),
      meta: {
        size,
        page,
        lastPage,
      },
    };
  }

  async findById(id: number) {
    const cirugia = await this.cirugia.findFirst({ where: { id, estado: { not: 'cancelada' } } });

    if (!cirugia) {
      throw new NotFoundException(`Cirugia with ID #${id} not found`);
    }
    return cirugia;
  }

  async update(id: number, updateCirugiaDto: UpdateCirugiaDto) {
    try {
      return await this.cirugia.update({
        where: { id, estado: { not: 'cancelada' } },
        data: updateCirugiaDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma error: record not found
        throw new NotFoundException(`Cirugía con id ${id} no encontrada`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.cirugia.update({
        where: { id },
        data: { estado: 'cancelada' },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Cirugía con id ${id} no encontrada`);
      }
      throw error;
    }
  }
}
