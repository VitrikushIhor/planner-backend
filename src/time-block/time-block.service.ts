import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { TimeBlockDto } from "./dto/time-block.dto";

@Injectable()
export class TimeBlockService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.timeBlock.findMany({
      where: { userId: userId },
      orderBy: {
        order: "desc",
      },
    });
  }

  async create(dto: TimeBlockDto, userId: string) {
    return this.prisma.timeBlock.create({
      // @ts-ignore
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(
    dto: Partial<TimeBlockDto>,
    timeBlockId: string,
    userId: string,
  ) {
    return this.prisma.timeBlock.update({
      where: {
        userId,
        id: timeBlockId,
      },
      data: dto,
    });
  }

  async delete(timeBlockId: string, userId: string) {
    return this.prisma.timeBlock.delete({
      where: {
        id: timeBlockId,
        userId,
      },
    });
  }

  async updateOrder(ids: string[]) {
    this.prisma.$transaction(
      ids.map((id, order) =>
        this.prisma.timeBlock.update({
          where: { id },
          data: { order },
        }),
      ),
    );
  }
}
