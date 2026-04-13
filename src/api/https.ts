type ApiErrorResponse = {
  status?: number;
  error?: string;
  message?: string;
};

async function parseError(response: Response): Promise<string> {
  try {
    const data = await response.json() as ApiErrorResponse;
    return data.message || data.error || `API error: ${response.status} ${response.statusText}`;
  } catch {
    return `API error: ${response.status} ${response.statusText}`;
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  return await response.json() as T;
}

export async function httpGet<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return parseJson<T>(response);
}

export async function httpPost<TResponse, TBody>(url: string, body: TBody): Promise<TResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return parseJson<TResponse>(response);
}
