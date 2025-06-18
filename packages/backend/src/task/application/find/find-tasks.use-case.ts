import { IsString, IsOptional } from "class-validator";
import { Injectable } from "@nestjs/common";
import { TaskRepository, TaskStatusValue } from "@/task/domain";

@Injectable()
export class FindTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(filters?: FindTasksFilters) {
    const taskList = await this.taskRepository.findAll(filters);

    return taskList.map((task) => task.toJSON());
  }
}

export class FindTasksFilters {
  @IsString()
  @IsOptional()
  status?: TaskStatusValue;
}
