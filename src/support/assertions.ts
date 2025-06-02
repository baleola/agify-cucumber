import { ApiResponse, ValidResponse } from "./types";

export class Assertions {
  static assertEqual<T>(actual: T, expected: T, message?: string): void {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected}, but got ${actual}`);
    }
  }

  static assertTrue(condition: boolean, message?: string): void {
    if (!condition) {
      throw new Error(message || "Assertion failed");
    }
  }

  static assertStatusCode(
    response: ApiResponse<any>,
    expectedCode: number
  ): void {
    this.assertEqual(
      response.status,
      expectedCode,
      `Expected status ${expectedCode}, got ${response.status}`
    );
  }

  static assertValidResponse(
    data: ValidResponse,
    checkCountryCode?: boolean
  ): void {
    this.assertTrue(
      typeof data.name === "string",
      "Response must have string name"
    );
    this.assertTrue(
      typeof data.age === "number" || data.age === null,
      "Response must have number age or null"
    );
    this.assertTrue(
      typeof data.count === "number",
      "Response must have number count"
    );

    if (checkCountryCode) {
      this.assertTrue(
        typeof data.country_id === "string",
        "Response must have string country_id"
      );
    }
  }

  static assertHasRateLimitHeaders(response: ApiResponse<any>): void {
    const headers = response.headers;
    this.assertTrue(
      "x-rate-limit-limit" in headers,
      "Response should contain X-Rate-Limit-Limit header"
    );
    this.assertTrue(
      "x-rate-limit-remaining" in headers,
      "Response should contain X-Rate-Limit-Remaining header"
    );

    this.assertTrue(
      "x-rate-limit-reset" in headers,
      "Response should contain X-Rate-Limit-Reset header"
    );
  }

  static assertErrorResponse(data: any): void {
    this.assertTrue(
      typeof data.error === "string",
      "Error response must have string error message"
    );
  }
}
