import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  patientName!: string;

  @IsString()
  @IsNotEmpty()
  service!: string;

  @IsString()
  @IsNotEmpty()
  room!: string;

  @IsDateString()
  start!: string;

  @IsDateString()
  end!: string;

  @IsString()
  @IsOptional()
  status?: string;
}
