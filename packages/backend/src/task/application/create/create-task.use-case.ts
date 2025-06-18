import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Injectable } from "@nestjs/common";
import {
  Task,
  TaskId,
  TaskTitle,
  TaskDueDate,
  TaskPriority,
  TaskRepository,
  TaskDescription,
} from "@/task/domain";

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(request: CreateTaskRequest): Promise<void> {
    const task = Task.create(
      TaskId.create(),
      TaskTitle.create(request.name),
      TaskDescription.create(request.description),
      TaskDueDate.create(request.dueDate),
      TaskPriority.create(request.priority)
    );

    await this.taskRepository.save(task);
  }
}

export class CreateTaskRequest {
  @ApiProperty({
    example: "My task",
    description: "The name of the task",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: "2021-01-01",
    description: "The due date of the task",
  })
  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @ApiProperty({
    example: 1,
    description: "The priority of the task",
  })
  @IsNumber()
  @IsNotEmpty()
  priority: number;
}
