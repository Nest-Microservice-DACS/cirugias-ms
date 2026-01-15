import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PersonalRole } from '../enum/surgery.enum';

export class CreateSurgeryDto {
  @IsNumber()
  @Type(() => Number)
  patientId: number;

  @IsDateString() // valida que sea un string ISO 8601  Ejemplo: "2024-06-15T13:45:30Z"
  date: string;

  @IsNumber()
  @Type(() => Number)
  serviceId: number;

  @IsNumber()
  @Type(() => Number)
  operatingRoomId: number;

  @IsString()
  anesthesia: string;

  @IsString()
  type: string;

  @IsString()
  priority: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SurgeryDoctorsDto)
  surgeryDoctors: SurgeryDoctorsDto[];
}

export class SurgeryDoctorsDto {
  @IsNumber()
  @Type(() => Number)
  doctorId: number;

  @IsEnum(PersonalRole)
  role: PersonalRole; // SURGEON, ASSISTANT, ANESTHETIST, ...   implementar una clase Enum
}
