import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from "@nestjs/swagger";
import {
  CreateTaskRequest,
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindTasksUseCase,
  UpdateTaskRequest,
  UpdateTaskUseCase,
  FindTasksFilters,
} from "@/task/application";
import { TaskStatusValue } from "@/task/domain";
import { Injectable } from "@nestjs/common";

@ApiTags("Tasks")
@Injectable()
@Controller("tasks")
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly findTasksUseCase: FindTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase
  ) {}

  @ApiOperation({
    summary: "Find all tasks",
    description: "Return all tasks",
  })
  @ApiQuery({
    name: "status",
    enumName: "status",
    schema: {
      type: "string",
      enum: Object.values(TaskStatusValue),
    },
    required: false,
    description: "Task status",
  })
  @ApiResponse({ status: 200, description: "Return all tasks" })
  @Get()
  async findAll(@Query() filters?: FindTasksFilters) {
    return this.findTasksUseCase.execute(filters);
  }

  @ApiOperation({
    summary: "Create a task",
    description: "Create a new task",
  })
  @ApiResponse({ status: 201, description: "Task created" })
  @Post()
  async create(@Body() request: CreateTaskRequest) {
    await this.createTaskUseCase.execute(request);
  }

  @ApiOperation({
    summary: "Update a task",
    description: "Update a task",
  })
  @ApiResponse({ status: 200, description: "Task updated" })
  @Put(":id")
  async update(@Param("id") id: string, @Body() request: UpdateTaskRequest) {
    await this.updateTaskUseCase.execute(id, request);
  }

  @ApiOperation({
    summary: "Delete a task",
    description: "Delete a task",
  })
  @ApiResponse({ status: 200, description: "Task deleted" })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    await this.deleteTaskUseCase.execute(id);
  }
}
