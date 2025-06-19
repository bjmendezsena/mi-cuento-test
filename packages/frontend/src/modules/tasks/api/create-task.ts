import { useMutation } from "@tanstack/react-query";
import type { MutationConfig } from "@/lib/react-query";
import type { CreateTaskDto } from "@/modules/tasks";
import { apiClient } from "@/lib";
import { queryKeys } from "./query-keys";

const url = "/tasks";

export const createTask = async (data: CreateTaskDto) => {
  return apiClient.post<never, void>(url, data);
};

export type CreateTaskOptions = MutationConfig<typeof createTask>;

export const useCreateTask = (options?: CreateTaskOptions) => {
  return useMutation({
    mutationFn: createTask,
    meta: {
      invalidatesQuery: [queryKeys.all],
    },
    ...options,
  });
};
