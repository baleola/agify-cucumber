@localization
Feature: Localization Prediction
    Scenario: Successful response for a name in GB
        When I request an age prediction for the name "Ola" with the country code of: "GB"
        Then the response status should be 200
        And the response should contain a valid age prediction and country code
        And the response should contain the name "Ola"
        And the response should contain the country code "GB"
        And the response count should be greater than 1

    Scenario: Successful response for a name in non existent country
        When I request an age prediction for the name "Ola" with the country code of: "XX"
        Then the response status should be 200
        And the response should contain a valid age prediction and country code
        And the response should contain the name "Ola"
        And the response should contain the country code "XX"
        And the age should be null for unknown names or countries
        And the response count should be zero