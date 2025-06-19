import { useQuery } from "@tanstack/react-query";
import type { QueryConfig } from "@/lib";
import { apiClient } from "@/lib";
import type { Task, ITasksFilters } from "@/modules/tasks";
import { queryKeys } from "./query-keys";

const url = "/tasks";

export const getTasks = async (filters?: ITasksFilters) => {
  return apiClient.get<never, Task[]>(url, { params: filters });
};

type QueryFnType = typeof getTasks;

type UseGetTasksParams = {
  filters?: ITasksFilters;
  queryConfig?: QueryConfig<QueryFnType>;
};

export const useGetTasks = ({ filters }: UseGetTasksParams = {}) => {
  return useQuery({
    queryKey: queryKeys.tasks(filters),
    queryFn: () => getTasks(filters),
  });
};
