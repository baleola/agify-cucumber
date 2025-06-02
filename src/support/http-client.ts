import { ApiResponse, AgifyApiResponse } from "./types";

export class HttpClient {
  private readonly baseUrl = "https://api.agify.io";
  private apiKey?: string;

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async get(
    endpoint: string,
    params?: Record<string, string | string[]>
  ): Promise<ApiResponse<AgifyApiResponse>> {
    const url = new URL(endpoint, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle batch requests with name[] parameter
          value.forEach(v => url.searchParams.append(`${key}[]`, v));
        } else {
          url.searchParams.append(key, value);
        }
      });
    }

    if (this.apiKey) {
      url.searchParams.append('apikey', this.apiKey);
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    return {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      data,
    };
  }
}
