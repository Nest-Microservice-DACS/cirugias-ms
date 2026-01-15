import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import { CreateSurgeryDto } from './create-surgery.dto';

export class UpdateSurgeryDto extends PartialType(CreateSurgeryDto) {
  @IsNumber()
  @IsPositive()
  id: number;
}
