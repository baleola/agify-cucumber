import { When, Given, DataTable } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { Assertions } from "../support/assertions";

Given(
  /^I have set the API key to "([^"]+)"$/,
  function (this: CustomWorld, apiKey: string) {
    this.setApiKey(apiKey);
    Assertions.assertTrue(
      this.testApiKey === apiKey,
      `API key should be set to ${apiKey}, but got ${this.testApiKey}`
    );
  }
);

When(
  /^I request an age prediction for the name "([^"]+)"(?: with the country code of: "([^"]+)")?$/,
  async function (this: CustomWorld, name: string, countryId?: string) {
    const params: Record<string, string> = { name };
    if (countryId) {
      params.country_id = countryId;
    }
    const response = await this.httpClient.get("/", params);
    this.setResponse(response);
  }
);

When(
  /^I request age predictions for the names:$/,
  async function (this: CustomWorld, names: DataTable) {
    const requestedNames = names.raw().flat();
    this.setRequestedNames(requestedNames);
    const response = await this.httpClient.get("/", { name: requestedNames });
    this.setResponse(response);
  }
);

When(
  /^I request age prediction without providing a name in the request$/,
  async function (this: CustomWorld) {
    const response = await this.httpClient.get("/", {});
    this.setResponse(response);
  }
);
