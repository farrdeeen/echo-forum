import api from "@/lib/api";          // your configured Axios instance

export async function getTyped<T>(url: string): Promise<T> {
  const { data } = await api.get<T>(url);
  return data;                       // Promise<T>, not AxiosResponse
}