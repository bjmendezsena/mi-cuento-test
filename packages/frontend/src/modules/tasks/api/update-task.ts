import { useMutation } from "@tanstack/react-query";
import type { MutationConfig } from "@/lib/react-query";
import type { CreateOrUpdateTaskDto } from "@/modules/tasks";
import { apiClient } from "@/lib";
import { queryKeys } from "./query-keys";

const url = "/tasks";

export const updateTask = async ({
  id,
  ...body
}: CreateOrUpdateTaskDto & {
  id: string;
}) => {
  return apiClient.put<never, void>(`${url}/${id}`, body);
};

export type UpdateTaskOptions = MutationConfig<typeof updateTask>;

export const useUpdateTask = (options?: UpdateTaskOptions) => {
  return useMutation({
    mutationFn: updateTask,
    mutationKey: queryKeys.updateTask(),
    meta: {
      invalidatesQuery: queryKeys.all,
    },
    ...options,
  });
};
