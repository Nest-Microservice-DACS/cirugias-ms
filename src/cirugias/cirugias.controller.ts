import { Controller } from '@nestjs/common';
import { CirugiasService } from './cirugias.service';
import { CreateCirugiaDto } from './dto/create-cirugia.dto';
import { UpdateCirugiaDto } from './dto/update-cirugia.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('cirugias')
export class CirugiasController {
  constructor(private readonly cirugiasService: CirugiasService) {}

  @MessagePattern({ cmd: 'create_cirugia' })
  async create(@Payload() createCirugiaDto: CreateCirugiaDto) {
    return this.cirugiasService.create(createCirugiaDto);
  }

  @MessagePattern({ cmd: 'get_cirugias' })
  async findAll(@Payload() paginationDto: PaginationDto) {
    return this.cirugiasService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'get_cirugia_by_id' })
  async findOne(@Payload('id') id: string) {
    return this.cirugiasService.findById(+id);
  }

  @MessagePattern({ cmd: 'update_cirugia' })
  async update(@Payload() updateCirugiaDto: UpdateCirugiaDto) {
    return this.cirugiasService.update(updateCirugiaDto.id, updateCirugiaDto);
  }

  @MessagePattern({ cmd: 'delete_cirugia' })
  async remove(@Payload() id: string) {
    return this.cirugiasService.remove(+id);
  }
}
