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
  create(@Payload() createCirugiaDto: CreateCirugiaDto) {
    return this.cirugiasService.create(createCirugiaDto);
  }

  @MessagePattern({ cmd: 'get_cirugias' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.cirugiasService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'get_cirugia' })
  findOne(@Payload('id') id: string) {
    return this.cirugiasService.findById(+id);
  }

  @MessagePattern({ cmd: 'update_cirugia' })
  update(@Payload() updateCirugiaDto: UpdateCirugiaDto) {
    return this.cirugiasService.update(updateCirugiaDto.id, updateCirugiaDto);
  }

  @MessagePattern({ cmd: 'delete_cirugia' })
  remove(@Payload() id: string) {
    return this.cirugiasService.remove(+id);
  }
}
