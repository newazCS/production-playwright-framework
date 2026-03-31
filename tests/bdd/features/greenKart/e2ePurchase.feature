@greenkart @ui
Feature: GreenKart End-to-End Purchase
  As a customer
  I want to purchase products from GreenKart
  So that I can complete an order from start to end

  Background:
    Given the user opens the GreenKart portal

  Scenario: Customer completes full purchase flow with two products
    When the user searches products with keyword "ca"
    And the user adds the following products to cart:
      | product  |
      | Cucumber |
      | Carrot   |
    And the user opens cart and proceeds to checkout
    Then the checkout page should be displayed for GreenKart
    And the checkout should contain the following products:
      | product  |
      | Cucumber |
      | Carrot   |
    When the user places order with country "India"
    Then the GreenKart order success message should contain "Thank you"

  Scenario: Customer completes full purchase flow with one product
    When the user searches products with keyword "be"
    And the user adds the following products to cart:
      | product  |
      | Beetroot |
    And the user opens cart and proceeds to checkout
    Then the checkout page should be displayed for GreenKart
    And the checkout should contain the following products:
      | product  |
      | Beetroot |
    When the user places order with country "India"
    Then the GreenKart order success message should contain "Thank you"
