import { Page } from '@playwright/test';
import { step } from '../../../utils/allureUtils';
import { HomePage } from '../pages/homePage';

export class HomeFlow {
  private homePage: HomePage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
  }

  async openHomePage() {
    await step('Open TodoMVC home page', async () => {
      await this.homePage.goto();
    });
  }

  async addTodo(title: string) {
    await step(`Add todo: ${title}`, async () => {
      await this.homePage.addTodo(title);
    });
  }

  async addTodos(titles: string[]) {
    for (const title of titles) {
      await this.addTodo(title);
    }
  }

  async completeTodo(title: string) {
    await step(`Complete todo: ${title}`, async () => {
      await this.homePage.completeTodo(title);
    });
  }

  async uncompleteTodo(title: string) {
    await step(`Restore todo to active state: ${title}`, async () => {
      await this.homePage.uncompleteTodo(title);
    });
  }

  async saveEditedTodo(oldTitle: string, newTitle: string) {
    await step(`Edit todo from "${oldTitle}" to "${newTitle}"`, async () => {
      await this.homePage.saveEditedTodo(oldTitle, newTitle);
    });
  }

  async cancelEditedTodo(oldTitle: string, newTitle: string) {
    await step(`Start editing todo "${oldTitle}" and cancel changes`, async () => {
      await this.homePage.cancelEditedTodo(oldTitle, newTitle);
    });
  }

  async deleteTodo(title: string) {
    await step(`Delete todo: ${title}`, async () => {
      await this.homePage.deleteTodo(title);
    });
  }

  async clearCompleted() {
    await step('Clear completed todos', async () => {
      await this.homePage.clearCompleted();
    });
  }

  async openFilter(name: 'All' | 'Active' | 'Completed') {
    await step(`Open ${name} filter`, async () => {
      await this.homePage.openFilter(name);
    });
  }

  async markAllAsComplete() {
    await step('Mark all todos as complete', async () => {
      await this.homePage.toggleAll().check();
    });
  }
}