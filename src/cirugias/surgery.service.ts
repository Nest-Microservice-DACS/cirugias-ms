import {
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { AddDoctorsSurgeryDto, CreateSurgeryDto, RemoveDoctorsSurgeryDto, UpdateSurgeryDto } from './dto';

@Injectable()
export class SurgeriesService extends PrismaClient implements OnModuleInit {
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

  private readonly logger = new Logger('SurgeriesService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  async create(createSurgeryDto: CreateSurgeryDto) {
    const { surgeryDoctors, ...rest } = createSurgeryDto;
    let data: any = { ...rest };
    if (surgeryDoctors && surgeryDoctors.length > 0) {
      data.surgeryDoctors = {
        create: surgeryDoctors.map((sd) => ({
          doctorId: sd.doctorId,
          role: sd.role,
        })),
      };
    }
    return this.surgery.create({
      data,
      include: { surgeryDoctors: true },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { size = 10, page = 1 } = paginationDto;

    const totalItems = await this.surgery.count();
    const lastPage = Math.ceil(totalItems / size);

    return {
      data: await this.surgery.findMany({
        take: size,
        skip: (page - 1) * size,
        where: { status: { not: 'cancelled' } },
        include: { surgeryDoctors: true },
      }),
      meta: {
        size,
        page,
        lastPage,
      },
    };
  }

  async findById(id: number) {
    const surgery = await this.surgery.findUnique({
      where: { id: id },
      include: { surgeryDoctors: true },
    });

    if (!surgery) {
      throw new RpcException({
        message: `Surgery with ID #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return surgery;
  }

  async update(id: number, updateSurgeryDto: UpdateSurgeryDto) {
    try {
      const { id: _, surgeryDoctors, ...rest } = updateSurgeryDto; // Exclude id from update data
      let data: any = { ...rest };
      if (surgeryDoctors && surgeryDoctors.length > 0) {
        data.surgeryDoctors = {
          set: [], // Remove existing
          create: surgeryDoctors.map((sd) => ({
            doctorId: sd.doctorId,
            role: sd.role,
          })),
        };
      }
      return await this.surgery.update({
        where: { id, status: { not: 'cancelled' } },
        data,
        include: { surgeryDoctors: true },
      });
    } catch (error) {
      throw new RpcException({
        message: `Surgery with ID #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async remove(id: number) {
    try {
      return await this.surgery.update({
        where: { id },
        data: { status: 'cancelled' },
        include: { surgeryDoctors: true },
      });
    } catch (error) {
      throw new RpcException({
        message: `Surgery with ID #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async addDoctorsToSurgery(addDoctorsSurgeryDto: AddDoctorsSurgeryDto, surgeryId: number) {
    try {
      const createData = addDoctorsSurgeryDto.doctors.map((doc) => ({
        surgeryId: surgeryId,
        doctorId: doc.doctorId,
        role: doc.role,
      }));
      // Create records
      await this.surgeryDoctor.createMany({
        data: createData,
        skipDuplicates: true,
      });
      // Return created records
      const created = await this.surgeryDoctor.findMany({
        where: {
          surgeryId: surgeryId,
          doctorId: { in: addDoctorsSurgeryDto.doctors.map((doc) => doc.doctorId) },
        },
      });
      return { created };
    } catch (error) {
      this.logger.error('Error adding doctors to surgery', error);
      throw new RpcException({
        message: `Error adding doctors to surgery: ${error.message}`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
  
  async removeDoctorsFromSurgery(removeDoctorsSurgeryDto: RemoveDoctorsSurgeryDto, surgeryId: number) {
    try {
      const { doctorIds } = removeDoctorsSurgeryDto;
      // Find records to delete
      const toDelete = await this.surgeryDoctor.findMany({
        where: {
          surgeryId: surgeryId,
          doctorId: { in: doctorIds },
        },
      });
      // Delete records
      await this.surgeryDoctor.deleteMany({
        where: {
          surgeryId: surgeryId,
          doctorId: { in: doctorIds },
        },
      });
      return { deleted: toDelete };
    } catch (error) {
      this.logger.error('Error removing doctors from surgery', error);
      throw new RpcException({
        message: `Error removing doctors from surgery: ${error.message}`,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
