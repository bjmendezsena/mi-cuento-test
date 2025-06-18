import { Module } from "@nestjs/common";
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindTasksUseCase,
  UpdateTaskUseCase,
} from "@/task/application";
import { PrismaTaskRepository } from "@/task/infrastructure/db";
import { TaskRepository } from "@/task/domain";
import { TaskController } from "./task.controller";

@Module({
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    DeleteTaskUseCase,
    FindTasksUseCase,
    UpdateTaskUseCase,
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository,
    },
  ],
})
export class TaskModule {}
