import { Controller, ParseIntPipe } from '@nestjs/common';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSurgeryDto, DoctorSurgeryDto, RemoveDoctorsSurgeryDto, UpdateSurgeryDto } from './dto';
import { SurgeriesService } from './surgery.service';

@Controller('surgery')
export class CirugiasController {
  constructor(private readonly surgeriesService: SurgeriesService) {}

  @MessagePattern({ cmd: 'create_surgery' })
  async create(@Payload() createSurgeryDto: CreateSurgeryDto) {
    return this.surgeriesService.create(createSurgeryDto);
  }

  @MessagePattern({ cmd: 'get_surgeries' })
  async findAll(@Payload() paginationDto: PaginationDto) {
    return this.surgeriesService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'get_surgery_by_id' })
  async findOne(@Payload('id') id: number) {
    return this.surgeriesService.findById(id);
  }

  @MessagePattern({ cmd: 'update_surgery' })
  async update(@Payload() updateSurgeryDto: UpdateSurgeryDto) {
    return this.surgeriesService.update(updateSurgeryDto.id, updateSurgeryDto);
  }

  @MessagePattern({ cmd: 'delete_surgery' })
  async remove(@Payload() id: number) {
    return this.surgeriesService.remove(id);
  }

  @MessagePattern({ cmd: 'add_doctors_to_surgery' })
  async addDoctorsToSurgery(
    @Payload()
    { surgeryId, doctors }: { surgeryId: number; doctors: DoctorSurgeryDto[] },
  ) {
    return this.surgeriesService.addDoctorsToSurgery({ doctors }, surgeryId);
  }

  @MessagePattern({ cmd: 'remove_doctors_from_surgery' })
  async removeDoctorsFromSurgery(
    @Payload()
    {
      surgeryId,
      doctorIds,
    }: {
      surgeryId: number;
      doctorIds: RemoveDoctorsSurgeryDto;
    },
  ) {
    return this.surgeriesService.removeDoctorsFromSurgery(doctorIds, surgeryId);
  }
}
