import { Page } from '@playwright/test';
import { step } from '../../../utils/allureUtils';
import { HomePage } from '../pages/homePage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OrderPage } from '../pages/orderPage';

export class PurchaseFlow {
  private homePage: HomePage;
  private checkoutPage: CheckoutPage;
  private orderPage: OrderPage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.orderPage = new OrderPage(page);
  }

  async openPortal() {
    await step('Open GreenKart portal', async () => {
      await this.homePage.goto();
    });
  }

  async searchProduct(keyword: string) {
    await step(`Search products by keyword: ${keyword}`, async () => {
      await this.homePage.searchProduct(keyword);
    });
  }

  async addProductsToCart(products: string[]) {
    for (const product of products) {
      await step(`Add product to cart: ${product}`, async () => {
        await this.homePage.addProductToCart(product);
      });
    }
  }

  async proceedToCheckout() {
    await step('Open cart popup', async () => {
      await this.homePage.openCart();
    });

    await step('Proceed to checkout', async () => {
      await this.homePage.clickProceedToCheckout();
    });
  }

  async placeOrder(country: string) {
    await step('Click place order on checkout page', async () => {
      await this.checkoutPage.clickPlaceOrder();
    });

    await step(`Select country: ${country}`, async () => {
      await this.orderPage.selectCountry(country);
    });

    await step('Agree to terms and conditions', async () => {
      await this.orderPage.agreeToTerms();
    });

    await step('Submit order', async () => {
      await this.orderPage.clickProceed();
    });
  }

  async isHomePageLoaded() {
    return await this.homePage.isLoaded();
  }

  async isCheckoutPageLoaded() {
    return await this.checkoutPage.isLoaded();
  }

  async getCheckoutProductNames() {
    return await this.checkoutPage.getCheckoutProductNames();
  }

  async getOrderSuccessMessage() {
    return await this.orderPage.getSuccessMessage();
  }
}
