import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { HttpClient } from "./http-client";
import { ApiResponse, AgifyApiResponse } from "./types";

export class CustomWorld extends World {
  public httpClient: HttpClient;
  public currentResponse: ApiResponse<AgifyApiResponse> | null = null;
  public requestedNames: string[] = [];
  public testApiKey?: string;

  constructor(options: IWorldOptions) {
    super(options);
    this.httpClient = new HttpClient();
  }

  setApiKey(apiKey: string): void {
    this.testApiKey = apiKey;
    this.httpClient.setApiKey(apiKey);
  }

  setRequestedNames(names: string[]): void {
    this.requestedNames = names;
  }

  setResponse(response: ApiResponse<AgifyApiResponse>): void {
    this.currentResponse = response;
  }

  getResponse(): ApiResponse<AgifyApiResponse> {
    if (!this.currentResponse) {
      throw new Error(
        "No response available. Make sure to call an API endpoint first."
      );
    }
    return this.currentResponse;
  }
}

setWorldConstructor(CustomWorld);
