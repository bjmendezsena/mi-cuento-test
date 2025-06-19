import type { ITasksFilters } from "@/modules/tasks";

export const queryKeys = {
  all: ["tasks"] as const,
  tasks: (filters?: ITasksFilters) => [...queryKeys.all, filters] as const,
  createTask: () => [...queryKeys.all, "createTask"] as const,
  updateTask: () => [...queryKeys.all, "updateTask"] as const,
};
