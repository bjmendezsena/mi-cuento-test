import { Injectable } from "@nestjs/common";
import { Task, TaskRepository, TaskStatusValue } from "@/task/domain";

@Injectable()
export class FindTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(status?: TaskStatusValue): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
}
