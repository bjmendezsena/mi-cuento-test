import { Task } from "@/task/domain/task";
import { TaskId, TaskName, TaskDueDate, TaskPriority } from "@/task/domain";
import { Task as PrismaTask } from "@prisma/client";

export class TaskMapper {
  static toDomain(prismaTask: PrismaTask): Task {
    return Task.create(
      new TaskId(prismaTask.id),
      new TaskName(prismaTask.name),
      new TaskDueDate(prismaTask.dueDate),
      new TaskPriority(prismaTask.priority)
    );
  }

  static toPersistence(task: Task): PrismaTask {
    return {
      id: task.id.value,
      title: task.title.value,
      description: task.description.value,
      status: task.status.value,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
