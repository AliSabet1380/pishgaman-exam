interface RequestOptions {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: any;
  authToken?: string;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export const apiClient = async <T = any>(
  url: string,
  options?: RequestOptions
): Promise<T> => {
  const baseUrl = "https://exam.pishgamanasia.com/webapi";

  const response = await fetch(`${baseUrl}/${url}`, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) throw new Error((await response.json()).title);

  const data = (await response.json()) as T;

  return data;
};
