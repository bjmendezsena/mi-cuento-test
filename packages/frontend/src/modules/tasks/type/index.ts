export type Task = {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  priority: number;
  status: TaskStatus;
};

export enum TaskStatus {
  PENDING = "PENDING",
  OVERDUE = "OVERDUE",
}

export interface TasksFilters {
  status?: TaskStatus;
  sortBy?: keyof Omit<Task, "id" | "description" | "status">;
  sortOrder?: "asc" | "desc";
}

export interface CreateTaskDto {
  name: string;
  description: string;
  dueDate: string;
  priority: number;
}

export interface UpdateTaskDto {
  name: string;
  description: string;
  dueDate: string;
  priority: number;
}
