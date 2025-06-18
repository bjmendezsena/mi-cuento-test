import { Task } from "@/task/domain/task";
import { TaskId, TaskTitle, TaskDueDate, TaskPriority } from "@/task/domain";
import { Task as PrismaTask } from "@prisma/client";

type PrismaTaskEntity = Omit<PrismaTask, "updatedAt" | "createdAt">;

export abstract class TaskMapper {
  static toDomain(prismaTask: PrismaTask): Task {
    return Task.create(
      new TaskId(prismaTask.id),
      new TaskTitle(prismaTask.title),
      new TaskTitle(prismaTask.title),
      new TaskDueDate(prismaTask.dueDate),
      new TaskPriority(prismaTask.priority)
    );
  }

  static toPersistence(task: Task): PrismaTaskEntity {
    return {
      id: task.id.value,
      title: task.title.value,
      description: task.description.value,
      dueDate: task.dueDate.value,
      priority: task.priority.value,
    };
  }
}
