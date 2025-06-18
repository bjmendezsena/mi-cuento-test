import { Injectable } from "@nestjs/common";
import { Task, TaskId, TaskRepository, TaskStatusValue } from "@/task/domain";
import { PrismaService } from "@/shared/infrastructure";
import { TaskMapper } from "./task.mapper";

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly taskMapper: TaskMapper
  ) {}
  findById(id: TaskId): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }
  findByStatus(status: TaskStatusValue): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: TaskId): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(task: Task): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async save(task: Task): Promise<void> {
    const taskModel = this.taskMapper.toPersistence(task);

    await this.prismaService.task.create({
      data: {
        id: taskModel.id.value,
        name: taskModel.name.value,
        dueDate: taskModel.dueDate.value,
        priority: taskModel.priority.value,
        status: taskModel.status.value,
      },
    });
  }
}
