import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, userId: number) {
    const start = new Date(data.start);
    const end = new Date(data.end);

    if (end <= start) {
      throw new BadRequestException('Data final deve ser maior que inicial');
    }

    const conflict = await this.prisma.appointment.findFirst({
      where: {
        room: data.room,
        start: { lt: end },
        end: { gt: start },
      },
    });

    if (conflict) {
      throw new BadRequestException('Horário já ocupado');
    }

    return this.prisma.appointment.create({
      data: {
        ...data,
        status: data.staus ?? 'PENDING',
        start,
        end,
        userId,
      },
    });
  }

  async update(id: number, data: any, userId: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new BadRequestException('Agendamento não encontrado');
    }

    if (appointment.userId !== userId) {
      throw new ForbiddenException('Você não pode editar este agendamento');
    }

    const start = data.start ? new Date(data.start) : appointment.start;
    const end = data.end ? new Date(data.end) : appointment.end;

    if (end <= start) {
      throw new BadRequestException('Data final inválida');
    }

    if (data.start || data.end) {
      const conflict = await this.prisma.appointment.findFirst({
        where: {
          id: { not: id },
          room: data.room ?? appointment.room,
          start: { lt: end },
          end: { gt: start },
        },
      });

      if (conflict) {
        throw new BadRequestException('Horário já ocupado');
      }
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        patientName: data.patientName ?? appointment.patientName,
        service: data.service ?? appointment.service,
        room: data.room ?? appointment.room,
        start,
        end,
        status: data.status ?? appointment.status,
      },
    });
  }

  findAll(date?: string) {
    if (!date) {
      return this.prisma.appointment.findMany({
        include: {
          user: { select: { nickname: true } },
        },
      });
    }

    const startDay = new Date(date);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(date);
    endDay.setHours(23, 59, 59, 999);

    return this.prisma.appointment.findMany({
      where: {
        start: {
          gte: startDay,
          lte: endDay,
        },
      },
      include: {
        user: { select: { nickname: true } },
      },
    });
  }

  async listByUserId(userId: number) {
    return this.prisma.appointment.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
  }

  async delete(id: number, userId: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new BadRequestException('Agendamento não encontrado');
    }

    if (appointment.userId !== userId) {
      throw new ForbiddenException('Você não pode deletar este agendamento');
    }

    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
