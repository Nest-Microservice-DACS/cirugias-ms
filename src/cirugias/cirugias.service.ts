import {
  HttpStatus,
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
import { RpcException } from '@nestjs/microservices';

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
    const cirugia = await this.cirugia.findFirst({
      where: { id, estado: { not: 'cancelada' } },
    });

    if (!cirugia) {
      throw new RpcException({
        message: `Cirugia with ID #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return cirugia;
  }

  async update(id: number, updateCirugiaDto: UpdateCirugiaDto) {
    try {
      const { id: _, ...data } = updateCirugiaDto; // Exclude id from update data
      return await this.cirugia.update({
        where: { id, estado: { not: 'cancelada' } },
        data: data,
      });
    } catch (error) {
      throw new RpcException({
        message: `Cirugia with ID #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async remove(id: number) {
    try {
      return await this.cirugia.update({
        where: { id },
        data: { estado: 'cancelada' },
      });
    } catch (error) {
      throw new RpcException({
        message: `Cirugia with ID #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
