@saucedemo @ui @bdd @allure.label.feature:BDD @allure.label.parentSuite:BDD @allure.label.suite:SauceDemo
Feature: User Login on SauceDemo
  As a customer
  I want to log in to the SauceDemo website
  So that I can see products and make purchases

  Background:
    Given the user is on the SauceDemo login page

  Scenario: User can login with valid username and password
    When the user enters username "standard_user"
    And the user enters password "secret_sauce"
    And the user clicks the login button
    Then the inventory page should be displayed
    And the page title should contain "Products"

  Scenario: User can see error message with wrong password
    When the user enters username "standard_user"
    And the user enters password "wrong_password"
    And the user clicks the login button
    Then an error message should appear with text "Epic sadface: Username and password do not match any user in this service"

  Scenario: User can see error message when username is empty
    When the user leaves username empty
    And the user enters password "secret_sauce"
    And the user clicks the login button
    Then an error message should appear with text "Epic sadface: Username is required"
