import { TasksFilters, Task, TaskId } from "@/task/domain";

export abstract class TaskRepository {
  abstract save(task: Task): Promise<void>;
  abstract findById(id: TaskId): Promise<Task>;
  abstract findAll(filters?: TasksFilters): Promise<Task[]>;
  abstract delete(id: TaskId): Promise<void>;
  abstract update(task: Task): Promise<void>;
}
