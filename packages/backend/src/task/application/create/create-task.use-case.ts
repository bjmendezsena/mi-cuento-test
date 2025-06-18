import { Injectable } from "@nestjs/common";
import {
  Task,
  TaskId,
  TaskName,
  TaskDueDate,
  TaskPriority,
  TaskRepository,
} from "@/task/domain";

export interface CreateTaskRequest {
  name: string;
  dueDate: string;
  priority: number;
}

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(request: CreateTaskRequest): Promise<void> {
    const task = Task.create(
      TaskId.create(),
      TaskName.create(request.name),
      TaskDueDate.create(request.dueDate),
      TaskPriority.create(request.priority)
    );

    await this.taskRepository.save(task);
  }
}
