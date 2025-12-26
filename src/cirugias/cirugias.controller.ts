import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CirugiasService } from './cirugias.service';
import { CreateCirugiaDto } from './dto/create-cirugia.dto';
import { UpdateCirugiaDto } from './dto/update-cirugia.dto';

@Controller('cirugias')
export class CirugiasController {
  constructor(private readonly cirugiasService: CirugiasService) {}

  @Post()
  create(@Body() createCirugiaDto: CreateCirugiaDto) {
    return this.cirugiasService.create(createCirugiaDto);
  }

  @Get()
  findAll() {
    return this.cirugiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cirugiasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCirugiaDto: UpdateCirugiaDto) {
    return this.cirugiasService.update(+id, updateCirugiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cirugiasService.remove(+id);
  }
}
