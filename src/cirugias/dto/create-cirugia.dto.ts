import { Type } from "class-transformer";
import { IsDateString, isNumber, IsNumber, IsString } from "class-validator";

export class CreateCirugiaDto {
    @IsNumber()
    @Type(() => Number)
    pacienteId: number;

    @IsDateString() // valida que sea un string ISO 8601  Ejemplo: "2024-06-15T13:45:30Z"
    fecha: string;

    @IsNumber() 
    @Type(() => Number)
    servicioId: number;

    @IsNumber()
    @Type(() => Number)
    quirofanoId: number;

    @IsString()
    anestesia: string;
    
    @IsString()
    tipo: string;


    @IsString()
    prioridad: string;
}
