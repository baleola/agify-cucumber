import { DataTable, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { ValidResponse, ErrorResponse } from "../support/types";
import { Assertions } from "../support/assertions";

Then(
  /^the response status should be (\d+)$/,
  function (this: CustomWorld, expectedStatus: number) {
    const response = this.getResponse();
    Assertions.assertStatusCode(response, expectedStatus);
  }
);

Then(
  /^the response should contain a valid age prediction( and country code)?$/,
  function (this: CustomWorld, countryCodePart: string | undefined) {
    const response = this.getResponse();
    const data = response.data as ValidResponse;    
    const checkCountryCode = countryCodePart !== null;
    Assertions.assertValidResponse(data, checkCountryCode);
  }
);

Then(
  /^the response should contain the names:$/,
  function (this: CustomWorld, expectedNames: DataTable) {
    const response = this.getResponse();
    const data = response.data as ValidResponse[];
    const namesArray = expectedNames
      .raw()
      .flat()
      .map((name) => name.toLowerCase());
    const responseNames = data.map((item) => item.name.toLowerCase());
    Assertions.assertEqual(
      responseNames.sort().join(","),
      namesArray.sort().join(","),
      `Expected names ${namesArray.join(", ")} but got ${responseNames.join(
        ", "
      )}`
    );
  }
);

Then(
  /^the response should contain the name "([^"]+)"$/,
  function (this: CustomWorld, expectedName: string) {
    const response = this.getResponse();
    const data = response.data as ValidResponse;
    Assertions.assertEqual(
      data.name.toLowerCase(),
      expectedName.toLowerCase(),
      `Expected name ${expectedName}`
    );
  }
);

Then(
  /^the response should contain the country code "([^"]+)"$/,
  function (this: CustomWorld, expectedCountryCode: string) {
    const response = this.getResponse();
    const data = response.data as ValidResponse;
    Assertions.assertEqual(
      data.country_id,
      expectedCountryCode,
      `Expected country code ${expectedCountryCode}, got ${data.country_id}`
    );
  }
);

Then(
  /^the response count should be greater than (\d+)$/,
  function (this: CustomWorld, minCount: number) {
    const response = this.getResponse();
    const data = response.data as ValidResponse;
    Assertions.assertTrue(
      typeof data.count === "number" && data.count > minCount,
      `Count should be greater than ${minCount}, got ${data.count}`
    );
  }
);

Then(
  /^the age should be null for unknown names or countries$/,
  function (this: CustomWorld) {
    const response = this.getResponse();
    const data = response.data as ValidResponse;
    Assertions.assertTrue(
      data.age === null,
      `Expected age to be null for unknown name, got ${data.age}`
    );
  }
);

Then(/^the response count should be zero$/, function (this: CustomWorld) {
  const response = this.getResponse();
  const data = response.data as ValidResponse;
  Assertions.assertEqual(
    data.count,
    0,
    `Expected age to be zero, got ${data.age}`
  );
});

Then(
  /^the response should contain (\d+) predictions$/,
  function (this: CustomWorld, expectedCount: number) {
    const response = this.getResponse();
    const data = response.data as ValidResponse[];
    Assertions.assertEqual(
      data.length,
      expectedCount,
      `Expected ${expectedCount} predictions, got ${data.length}`
    );
  }
);

Then(
  /^each prediction should have a valid structure$/,
  function (this: CustomWorld) {
    const response = this.getResponse();
    const data = response.data as ValidResponse[];
    data.forEach((prediction) => {
      Assertions.assertValidResponse(prediction);
    });
  }
);

Then(
  /^the response should contain an error message$/,
  function (this: CustomWorld) {
    const response = this.getResponse();
    const data = response.data;
    Assertions.assertErrorResponse(data);
  }
);

Then(
  /^the error message should be "([^"]*)"$/,
  function (this: CustomWorld, expectedError: string) {
    const response = this.getResponse();
    const data = response.data as ErrorResponse;
    Assertions.assertEqual(
      data.error,
      expectedError,
      `Expected error message: ${expectedError}`
    );
  }
);

Then(
  /^the response should include rate limiting headers$/,
  function (this: CustomWorld) {
    const response = this.getResponse();
    Assertions.assertHasRateLimitHeaders(response);
  }
);
