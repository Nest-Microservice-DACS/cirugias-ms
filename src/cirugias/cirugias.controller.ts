import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CirugiasService } from './cirugias.service';
import { CreateCirugiaDto } from './dto/create-cirugia.dto';
import { UpdateCirugiaDto } from './dto/update-cirugia.dto';
import { PaginationDto } from 'src/common';

@Controller('cirugias')
export class CirugiasController {
  constructor(private readonly cirugiasService: CirugiasService) {}

  @Post()
  create(@Body() createCirugiaDto: CreateCirugiaDto) {
    return this.cirugiasService.create(createCirugiaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.cirugiasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cirugiasService.findById(+id);
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
