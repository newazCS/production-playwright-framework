import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
  private locators = {
    cartBadge: '.shopping_cart_badge',
    inventoryContainer: '.inventory_list'
  };

  async isLoaded() {
    return await this.isVisible(this.locators.inventoryContainer);
  }

  async addProductToCart(productName: string) {
    const addToCartButton = this.page.locator(
      '.inventory_item',
      {
        has: this.page.locator('.inventory_item_name', { hasText: productName })
      }
    ).locator('button');

    await addToCartButton.click();
  }

  async getCartBadgeCount() {
    const badge = this.page.locator(this.locators.cartBadge);
    return await badge.textContent();
  }
}