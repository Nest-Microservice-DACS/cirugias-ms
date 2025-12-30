import { PartialType } from '@nestjs/mapped-types';
import { CreateCirugiaDto } from './create-cirugia.dto';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateCirugiaDto extends PartialType(CreateCirugiaDto) {
  @IsNumber()
  @IsPositive()
  id: number;
}
