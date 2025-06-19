/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationCache, QueryClient } from "@tanstack/react-query";
import type {
  UseMutationOptions,
  DefaultOptions,
  QueryKey,
  UseQueryOptions,
} from "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey;
      successMessage?: string;
      errorMessage?: string;
    };
  }
}

const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
  mutationCache: new MutationCache({
    onSettled(_, __, ___, ____, mutation) {
      queryClient.invalidateQueries({
        queryKey: mutation.meta?.invalidatesQuery,
      });
    },
  }),
});

export type ApiFnReturnType<FnType extends (...args: any[]) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type ExtractFnReturnType<
  FnType extends (...args: unknown[]) => Promise<any>
> = Awaited<ReturnType<FnType>>;
export type QueryConfig<QueryFnType extends (...args: any[]) => Promise<any>> =
  Omit<
    UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
    "queryKey" | "queryFn"
  >;
export type MutationConfig<
  MutationFnType extends (...args: any[]) => Promise<any>
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
