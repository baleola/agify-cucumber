@error-handling
Feature: Error Handling

  Scenario: Invalid API Key
    Given I have set the API key to "invalid"
    When I request an age prediction for the name "David"
    Then the response status should be 401
    And the response should contain an error message
    And the error message should be "Invalid API key"

  Scenario: Missing name parameter
    When I request age prediction without providing a name in the request
    Then the response status should be 422
    And the response should contain an error message
    And the error message should be "Missing 'name' parameter"
