import { IsNumber, IsPositive, IsEnum } from 'class-validator';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PersonalRole } from '../enum/surgery.enum';

export class DoctorSurgeryDto {
  @IsNumber()
  @IsPositive()
  doctorId: number;

  @IsEnum(PersonalRole)
  role: PersonalRole;
}

export class AddDoctorsSurgeryDto {
  @ValidateNested({ each: true })
  @Type(() => DoctorSurgeryDto)
  doctors: DoctorSurgeryDto[];
}

export class RemoveDoctorsSurgeryDto {
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  doctorIds: number[];
}