import { IsString, IsOptional, IsIn } from "class-validator";
import { Injectable } from "@nestjs/common";
import { TaskObject, TaskRepository, TaskStatusValue } from "@/task/domain";

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
  @IsIn(Object.values(TaskStatusValue))
  status?: TaskStatusValue;

  @IsString()
  @IsOptional()
  @IsIn(["title", "dueDate", "priority"])
  sortBy?: keyof Omit<TaskObject, "id" | "description" | "status">;

  @IsString()
  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc";
}
