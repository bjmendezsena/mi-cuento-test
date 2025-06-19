import type { AxiosResponse } from "axios";
import Axios, { AxiosError } from "axios";
import { envs } from "@/config";

function onFulfilled(response: AxiosResponse) {
  return response.data;
}

async function onRejected(error: AxiosError) {
  return Promise.reject(error);
}

function baseFactory(baseURL: string) {
  return Axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

function apiFactory(baseURL: string) {
  const client = baseFactory(baseURL);
  client.interceptors.response.use(onFulfilled, onRejected);
  return client;
}

export const apiClient = apiFactory(envs.API_URL);
