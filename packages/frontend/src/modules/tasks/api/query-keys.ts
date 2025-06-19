import type { TasksFilters } from "@/modules/tasks";

export const queryKeys = {
  all: ["tasks"] as const,
  tasks: (filters?: TasksFilters) => ["tasks", filters] as const,
};
