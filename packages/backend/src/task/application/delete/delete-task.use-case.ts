import { Injectable } from "@nestjs/common";
import { TaskId, TaskRepository } from "@/task/domain";

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    const taskId = new TaskId(id);
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    await this.taskRepository.delete(taskId);
  }
}
