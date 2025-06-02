@smoke
Feature: Single Name Age Prediction

  Scenario: Successful response for a name
    When I request an age prediction for the name "Ola"
    Then the response status should be 200
    And the response should contain a valid age prediction
    And the response should contain the name "Ola"
    And the response count should be greater than 1

  Scenario: Successful response for a name with diacritics
    When I request an age prediction for the name "Anaïs"
    Then the response status should be 200
    And the response should contain a valid age prediction
    And the response should contain the name "Anaïs"
    And the response count should be greater than 1

  Scenario: Successful response for non-existent name
    When I request an age prediction for the name "nonexistentname12345"
    Then the response status should be 200
    And the response should contain the name "nonexistentname12345"
    And the age should be null for unknown names or countries
    And the response count should be zero

  Scenario: Successful response for a full name
    When I request an age prediction for the name "James Bond"
    Then the response status should be 200
    And the response should contain a valid age prediction
    And the response should contain the name "James Bond"
