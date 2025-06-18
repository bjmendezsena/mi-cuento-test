import { Task, TaskId, TaskStatusValue } from "@/task/domain";

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findById(id: TaskId): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  findByStatus(status: TaskStatusValue): Promise<Task[]>;
  delete(id: TaskId): Promise<void>;
  update(task: Task): Promise<void>;
}
