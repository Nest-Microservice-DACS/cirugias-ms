import { PartialType } from '@nestjs/mapped-types';
import { CreateCirugiaDto } from './create-cirugia.dto';
import { IsString } from 'class-validator';

export class UpdateCirugiaDto extends PartialType(CreateCirugiaDto) {


}
