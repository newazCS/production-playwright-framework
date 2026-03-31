@saucedemo @ui @bdd @allure.label.feature:BDD @allure.label.parentSuite:BDD @allure.label.suite:SauceDemo
Feature: Add Products to Cart on SauceDemo
  As a customer
  I want to add products to my shopping cart
  So that I can purchase them

  Background:
    Given the user is logged in as "standard_user"

  Scenario: User can add one product to cart
    When the user clicks add to cart for "Sauce Labs Backpack"
    Then the cart badge should show "1"

  Scenario: User can add multiple products to cart
    When the user clicks add to cart for "Sauce Labs Backpack"
    And the user clicks add to cart for "Sauce Labs Bike Light"
    And the user clicks add to cart for "Sauce Labs Bolt T-Shirt"
    Then the cart badge should show "3"

  Scenario: User can remove product from cart
    When the user clicks add to cart for "Sauce Labs Backpack"
    And the user removes "Sauce Labs Backpack" from cart
    Then the cart badge should show "0"

  Scenario: User can view cart
    When the user clicks add to cart for "Sauce Labs Backpack"
    And the user clicks on the shopping cart icon
    Then the cart page should be displayed
    And "Sauce Labs Backpack" should be visible in the cart
