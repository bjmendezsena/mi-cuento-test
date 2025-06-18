import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import {
  Task,
  TaskId,
  TaskRepository,
  TaskNotFoundException,
  TasksFilters,
  TaskDueDate,
  TaskStatus,
} from "@/task/domain";
import { PrismaService } from "@/shared/infrastructure";
import { TaskMapper } from "./task.mapper";

type Where = Prisma.TaskWhereInput;
type OrderBy = Prisma.TaskOrderByWithRelationInput;

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: TaskId): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: {
        id: id.value,
      },
    });

    if (!task) {
      throw new TaskNotFoundException("id", id.value);
    }

    return TaskMapper.toDomain(task);
  }
  async findAll(filters?: TasksFilters): Promise<Task[]> {
    const where: Where = {};
    const orderBy: OrderBy = {};

    if (filters?.status) {
      const status = new TaskStatus(filters.status);
      const now = TaskDueDate.now();

      if (status.isOverdue) {
        where.dueDate = {
          lt: now.value,
        };
      } else {
        where.dueDate = {
          gte: now.value,
        };
      }
    }

    if (filters?.sortBy) {
      const sortOrder = filters.sortOrder || "asc";
      orderBy[filters.sortBy] = sortOrder;
    }

    const tasks = await this.prismaService.task.findMany({
      where,
      orderBy,
    });
    return tasks.map(TaskMapper.toDomain);
  }

  async delete(id: TaskId): Promise<void> {
    const taskToDelete = await this.findById(id);

    await this.prismaService.task.delete({
      where: {
        id: taskToDelete.id.value,
      },
    });
  }
  async update(task: Task): Promise<void> {
    await this.prismaService.task.update({
      where: {
        id: task.id.value,
      },
      data: TaskMapper.toPersistence(task),
    });
  }

  async save(task: Task): Promise<void> {
    await this.prismaService.task.create({
      data: TaskMapper.toPersistence(task),
    });
  }
}
