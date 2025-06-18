import { IsOptional, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {
  TaskRepository,
  TaskDescription,
  TaskId,
  TaskTitle,
  TaskDueDate,
  TaskPriority,
} from "@/task/domain";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string, request: UpdateTaskRequest): Promise<void> {
    const taskId = new TaskId(id);
    const task = await this.taskRepository.findById(taskId);

    task.update(
      TaskTitle.create(request.name),
      TaskDescription.create(request.description),
      TaskDueDate.create(request.dueDate),
      TaskPriority.create(request.priority)
    );

    await this.taskRepository.update(task);
  }
}

export class UpdateTaskRequest {
  @ApiProperty({
    example: "My task",
    description: "The name of the task",
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: "2021-01-01",
    description: "The due date of the task",
  })
  @IsString()
  @IsOptional()
  dueDate: string;

  @ApiProperty({
    example: 1,
    description: "The priority of the task",
  })
  @IsNumber()
  @IsOptional()
  priority: number;
}
