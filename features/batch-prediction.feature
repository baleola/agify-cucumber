@batch
Feature: Batch

  Scenario: Scenario Outline name: Predict ages for multiple common names
    When I request age predictions for the names:
      | michael  |
      | jennifer |
      | david    |
    Then the response status should be 200
    And the response should contain 3 predictions
    And each prediction should have a valid structure
    And the response should contain the names:
      | michael  |
      | jennifer |
      | david    |

  Scenario: Predict ages for maximum batch size (10 names)
    When I request age predictions for the names:
      | michael  |
      | jennifer |
      | david    |
      | sarah    |
      | john     |
      | lisa     |
      | robert   |
      | karen    |
      | william  |
      | susan    |
    Then the response status should be 200
    And the response should contain 10 predictions
    And each prediction should have a valid structure