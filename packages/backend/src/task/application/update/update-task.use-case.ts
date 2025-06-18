import {
  TaskRepository,
  TaskId,
  TaskName,
  TaskDueDate,
  TaskPriority,
} from "@/task/domain";
import { Injectable } from "@nestjs/common";

export interface UpdateTaskRequest {
  id: string;
  name: string;
  dueDate: string;
  priority: number;
}

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(request: UpdateTaskRequest): Promise<void> {
    const taskId = new TaskId(request.id);
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error(`Task with id ${request.id} not found`);
    }

    task.update(
      TaskName.create(request.name),
      TaskDueDate.create(request.dueDate),
      TaskPriority.create(request.priority)
    );

    await this.taskRepository.update(task);
  }
}
