@saucedemo @ui
Feature: Checkout Process on SauceDemo
  As a customer
  I want to complete the checkout process
  So that I can finish my purchase

  Background:
    Given the user is logged in as "standard_user"

  Scenario: User can complete checkout with valid information
    When the user clicks add to cart for "Sauce Labs Backpack"
    And the user clicks on the shopping cart icon
    And the user clicks the checkout button
    And the user enters firstname "John"
    And the user enters lastname "Doe"
    And the user enters zipcode "12345"
    And the user clicks the continue button
    Then the checkout overview page should be displayed
    And the total price should be visible

  Scenario: User can finish checkout and see success message
    When the user clicks add to cart for "Sauce Labs Backpack"
    And the user clicks on the shopping cart icon
    And the user clicks the checkout button
    And the user enters firstname "John"
    And the user enters lastname "Doe"
    And the user enters zipcode "12345"
    And the user clicks the continue button
    And the user clicks the finish button
    Then the success message should display "Thank you for your order!"

  Scenario: User cannot checkout without firstname
    When the user clicks add to cart for "Sauce Labs Backpack"
    And the user clicks on the shopping cart icon
    And the user clicks the checkout button
    And the user leaves firstname empty
    And the user enters lastname "Doe"
    And the user enters zipcode "12345"
    And the user clicks the continue button
    Then an error message should appear with text "Error: First Name is required"
