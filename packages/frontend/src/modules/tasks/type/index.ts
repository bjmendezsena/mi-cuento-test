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

export interface ITasksFilters {
  status?: TaskStatus;
  sortBy?: keyof Omit<Task, "id" | "description" | "status">;
  sortOrder?: "asc" | "desc";
}

export interface CreateOrUpdateTaskDto {
  name: string;
  description: string;
  dueDate: string;
  priority: number;
}
