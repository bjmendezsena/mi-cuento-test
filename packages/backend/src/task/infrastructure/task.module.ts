import { Module } from "@nestjs/common";
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindTasksUseCase,
  UpdateTaskUseCase,
} from "@/task/application";
import { TaskController } from "./task.controller";

@Module({
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    DeleteTaskUseCase,
    FindTasksUseCase,
    UpdateTaskUseCase,
  ],
})
export class TaskModule {}
