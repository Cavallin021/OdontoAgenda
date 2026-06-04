import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Put,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private service: AppointmentsService) {}

  @Post()
  create(@Body() body: CreateAppointmentDto, @Request() req: any) {
    return this.service.create(body, req.user.userId);
  }

  @Get()
  findAll(@Query('date') date?: string) {
    return this.service.findAll(date);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any, @Request() req: any) {
    return this.service.update(Number(id), body, req.user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: any) {
    return this.service.delete(Number(id), req.user.userId);
  }

  @Get('me')
  getAppointments(@Request() req: any) {
    const userId = req.user.userId;
    return this.service.listByUserId(userId);
  }
}
