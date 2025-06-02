@rate-limit
Feature: Rate Limiting and Response Headers
  Scenario: Check rate limiting headers in response
    When I request an age prediction for the name "Paul"
    Then the response status should be 200
    And the response should include rate limiting headers