import { Locator } from '@playwright/test';
import { BasePage } from '../../sauceDemo/pages/basePage';
import { appConfig } from '../../../config/appConfig';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export class HomePage extends BasePage {
  private selectors = {
    newTodo: '.new-todo',
    main: '.main',
    footer: '.footer',
    todoItems: '.todo-list li',
    todoLabels: '.todo-list li label',
    todoEditor: '.todo-list li.editing .edit',
    toggleAll: '.toggle-all',
    itemsLeftCounter: '.todo-count'
  };

  async goto() {
    await this.navigate(appConfig.todoMvc.ui.baseUrl);
  }

  async isLoaded() {
    return await this.isVisible(this.selectors.newTodo);
  }

  newTodoInput(): Locator {
    return this.page.locator(this.selectors.newTodo);
  }

  mainSection(): Locator {
    return this.page.locator(this.selectors.main);
  }

  footer(): Locator {
    return this.page.locator(this.selectors.footer);
  }

  todoItems(): Locator {
    return this.page.locator(this.selectors.todoItems);
  }

  todoLabels(): Locator {
    return this.page.locator(this.selectors.todoLabels);
  }

  todoItem(title: string): Locator {
    return this.page.locator(this.selectors.todoItems).filter({
      has: this.page.locator('label', { hasText: new RegExp(`^${escapeRegExp(title)}$`) })
    });
  }

  todoLabel(title: string): Locator {
    return this.todoItem(title).locator('label');
  }

  todoToggle(title: string): Locator {
    return this.todoItem(title).locator('.toggle');
  }

  todoDestroy(title: string): Locator {
    return this.todoItem(title).locator('.destroy');
  }

  itemsLeftCounter(): Locator {
    return this.page.locator(this.selectors.itemsLeftCounter);
  }

  clearCompletedButton(): Locator {
    return this.page.getByRole('button', { name: 'Clear completed' });
  }

  filterLink(name: 'All' | 'Active' | 'Completed'): Locator {
    return this.page.getByRole('link', { name });
  }

  todoEditor(): Locator {
    return this.page.locator(this.selectors.todoEditor);
  }

  toggleAll(): Locator {
    return this.page.locator(this.selectors.toggleAll);
  }

  async addTodo(title: string) {
    await this.newTodoInput().fill(title);
    await this.newTodoInput().press('Enter');
  }

  async addTodos(titles: string[]) {
    for (const title of titles) {
      await this.addTodo(title);
    }
  }

  async completeTodo(title: string) {
    await this.todoToggle(title).check();
  }

  async uncompleteTodo(title: string) {
    await this.todoToggle(title).uncheck();
  }

  async startEditingTodo(title: string) {
    await this.todoLabel(title).dblclick();
  }

  async saveEditedTodo(oldTitle: string, newTitle: string) {
    await this.startEditingTodo(oldTitle);
    await this.todoEditor().fill(newTitle);
    await this.todoEditor().press('Enter');
  }

  async cancelEditedTodo(oldTitle: string, newTitle: string) {
    await this.startEditingTodo(oldTitle);
    await this.todoEditor().fill(newTitle);
    await this.todoEditor().press('Escape');
  }

  async deleteTodo(title: string) {
    await this.todoItem(title).hover();
    await this.todoDestroy(title).click();
  }

  async clearCompleted() {
    await this.clearCompletedButton().click();
  }

  async openFilter(name: 'All' | 'Active' | 'Completed') {
    await this.filterLink(name).click();
  }
}