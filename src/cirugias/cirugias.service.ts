import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleDestroy,
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
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class CirugiasService 
   extends PrismaClient
  implements OnModuleInit
{
  private pool: Pool;
  private adapter: PrismaPg;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
    this.pool = pool;
    this.adapter = adapter;
  }

  private readonly logger = new Logger('CirugiasService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  async create(createCirugiaDto: CreateCirugiaDto) {
    const { cirugiaMedicos, ...rest } = createCirugiaDto;
    let data: any = { ...rest };
    if (cirugiaMedicos && cirugiaMedicos.length > 0) {
      data.cirugiaMedicos = {
        create: cirugiaMedicos.map((cm) => ({
          medicoId: cm.medicoId,
          rol: cm.rol,
        })),
      };
    }
    return this.cirugia.create({
      data,
      include: { cirugiaMedicos: true },
    });
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
        include: { cirugiaMedicos: true },
      }),
      meta: {
        size,
        page,
        lastPage,
      },
    };
  }

  async findById(id: number) {
    const cirugia = await this.cirugia.findUnique({
      where: { id: id },
      include: { cirugiaMedicos: true },
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
      const { id: _, cirugiaMedicos, ...rest } = updateCirugiaDto; // Exclude id from update data
      let data: any = { ...rest };
      if (cirugiaMedicos && cirugiaMedicos.length > 0) {
        data.cirugiaMedicos = {
          set: [], // Remove existing
          create: cirugiaMedicos.map((cm) => ({
            medicoId: cm.medicoId,
            rol: cm.rol,
          })),
        };
      }
      return await this.cirugia.update({
        where: { id, estado: { not: 'cancelada' } },
        data,
        include: { cirugiaMedicos: true },
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
        include: { cirugiaMedicos: true },
      });
    } catch (error) {
      throw new RpcException({
        message: `Cirugia with ID #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
