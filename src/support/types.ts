export interface ApiResponse<T = any> {
  status: number;
  headers: Record<string, string>;
  data: T;
}

export interface ValidResponse {
  name: string;
  age: number | null;
  count: number;
  country_id?: string;
}

export interface ErrorResponse {
  error: string;
}

export type AgifyApiResponse = ValidResponse | ValidResponse[] | ErrorResponse;
