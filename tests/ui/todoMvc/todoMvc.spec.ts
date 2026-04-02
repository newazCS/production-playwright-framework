import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { HomeFlow } from '../../../apps/todoMvc/flows/homeFlow';
import { HomePage } from '../../../apps/todoMvc/pages/homePage';
import { todoMvcSite } from '../../../apps/todoMvc/data/site';
import { step } from '../../../utils/allureUtils';

async function setAllureStory(name: string): Promise<void> {
  await allure.feature('UI');
  await allure.story(`TodoMVC - ${name}`);
}

test.describe('UI - TodoMVC', { tag: '@ui' }, () => {
  test.beforeEach(async ({ page }) => {
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.openHomePage();
    await expect(homePage.newTodoInput()).toBeVisible();
  });

  test('Home page loads with title and input', async ({ page }) => {
    await setAllureStory('Home Page');
    const homePage = new HomePage(page);

    await step('Verify page title and heading are visible', async () => {
      await expect(page).toHaveTitle(todoMvcSite.expectedTitle);
      await expect(page.getByRole('heading', { level: 1, name: todoMvcSite.heading })).toBeVisible();
      await expect(homePage.newTodoInput()).toHaveAttribute('placeholder', todoMvcSite.newTodoPlaceholder);
    });
  });

  test('Empty state hides main list and footer', async ({ page }) => {
    await setAllureStory('Empty State');
    const homePage = new HomePage(page);

    await step('Verify list and footer are hidden before adding items', async () => {
      await expect(homePage.mainSection()).toHaveCount(0);
      await expect(homePage.footer()).toHaveCount(0);
      await expect(homePage.todoItems()).toHaveCount(0);
    });
  });

  test('User can add a single todo', async ({ page }) => {
    await setAllureStory('Add Single Todo');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await step('Add one todo item', async () => {
      await homeFlow.addTodo('Buy milk');
    });

    await step('Verify the todo is visible', async () => {
      await expect(homePage.todoItems()).toHaveCount(1);
      await expect(homePage.todoLabel('Buy milk')).toBeVisible();
    });
  });

  test('User can add multiple todos in creation order', async ({ page }) => {
    await setAllureStory('Add Multiple Todos');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await step('Add multiple todo items', async () => {
      await homeFlow.addTodos(['Buy milk', 'Walk dog', 'Read book']);
    });

    await step('Verify item count and order', async () => {
      await expect(homePage.todoItems()).toHaveCount(3);
      await expect(homePage.todoLabels()).toHaveText(['Buy milk', 'Walk dog', 'Read book']);
    });
  });

  test('Input is cleared after adding a todo', async ({ page }) => {
    await setAllureStory('Input Reset');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await step('Add a todo and verify the input is cleared', async () => {
      await homeFlow.addTodo('Buy milk');
      await expect(homePage.newTodoInput()).toHaveValue('');
    });
  });

  test('Completing a todo marks it as completed', async ({ page }) => {
    await setAllureStory('Complete Todo');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodo('Buy milk');

    await step('Complete the todo item', async () => {
      await homeFlow.completeTodo('Buy milk');
    });

    await step('Verify completed state is applied', async () => {
      await expect(homePage.todoItem('Buy milk')).toHaveClass(/completed/);
      await expect(homePage.todoToggle('Buy milk')).toBeChecked();
    });
  });

  test('Active item counter updates after completing a todo', async ({ page }) => {
    await setAllureStory('Active Counter');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodos(['Buy milk', 'Walk dog']);
    await homeFlow.completeTodo('Buy milk');

    await step('Verify the counter shows one active item left', async () => {
      await expect(homePage.itemsLeftCounter()).toContainText('1 item left');
    });
  });

  test('Clear completed is hidden until a todo is completed', async ({ page }) => {
    await setAllureStory('Clear Completed Visibility');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodo('Buy milk');

    await step('Verify clear completed is hidden before completion', async () => {
      await expect(homePage.clearCompletedButton()).toHaveCount(0);
    });

    await step('Complete the todo and verify the button appears', async () => {
      await homeFlow.completeTodo('Buy milk');
      await expect(homePage.clearCompletedButton()).toBeVisible();
    });
  });

  test('Active filter shows only active todos and updates route', async ({ page }) => {
    await setAllureStory('Active Filter');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodos(['Buy milk', 'Walk dog']);
    await homeFlow.completeTodo('Buy milk');

    await step('Open the active filter', async () => {
      await homeFlow.openFilter('Active');
    });

    await step('Verify route and visible todos', async () => {
      await expect(page).toHaveURL(/#\/active$/);
      await expect(homePage.todoItems()).toHaveCount(1);
      await expect(homePage.todoLabel('Walk dog')).toBeVisible();
      await expect(homePage.todoLabel('Buy milk')).toHaveCount(0);
    });
  });

  test('Completed filter shows only completed todos and updates route', async ({ page }) => {
    await setAllureStory('Completed Filter');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodos(['Buy milk', 'Walk dog']);
    await homeFlow.completeTodo('Buy milk');

    await step('Open the completed filter', async () => {
      await homeFlow.openFilter('Completed');
    });

    await step('Verify route and visible todos', async () => {
      await expect(page).toHaveURL(/#\/completed$/);
      await expect(homePage.todoItems()).toHaveCount(1);
      await expect(homePage.todoLabel('Buy milk')).toBeVisible();
      await expect(homePage.todoLabel('Walk dog')).toHaveCount(0);
    });
  });

  test('All filter shows active and completed todos together', async ({ page }) => {
    await setAllureStory('All Filter');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodos(['Buy milk', 'Walk dog']);
    await homeFlow.completeTodo('Buy milk');
    await homeFlow.openFilter('Completed');

    await step('Return to the all filter', async () => {
      await homeFlow.openFilter('All');
    });

    await step('Verify all todos are visible again', async () => {
      await expect(page).toHaveURL(/#\/$/);
      await expect(homePage.todoItems()).toHaveCount(2);
      await expect(homePage.todoLabel('Buy milk')).toBeVisible();
      await expect(homePage.todoLabel('Walk dog')).toBeVisible();
    });
  });

  test('Mark all as complete completes every todo', async ({ page }) => {
    await setAllureStory('Mark All Complete');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodos(['Buy milk', 'Walk dog', 'Read book']);

    await step('Use the toggle-all control', async () => {
      await homeFlow.markAllAsComplete();
    });

    await step('Verify all items are completed', async () => {
      await expect(homePage.todoItems()).toHaveCount(3);
      await expect(page.locator('.todo-list li.completed')).toHaveCount(3);
      await expect(homePage.itemsLeftCounter()).toContainText('0 items left');
    });
  });

  test('Unchecking a completed todo returns it to active state', async ({ page }) => {
    await setAllureStory('Restore Active Todo');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodo('Buy milk');
    await homeFlow.completeTodo('Buy milk');

    await step('Uncheck the completed todo', async () => {
      await homeFlow.uncompleteTodo('Buy milk');
    });

    await step('Verify it becomes active again', async () => {
      await expect(homePage.todoItem('Buy milk')).not.toHaveClass(/completed/);
      await expect(homePage.todoToggle('Buy milk')).not.toBeChecked();
      await expect(homePage.itemsLeftCounter()).toContainText('1 item left');
    });
  });

  test('Double click opens inline edit mode', async ({ page }) => {
    await setAllureStory('Open Edit Mode');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodo('Walk dog');

    await step('Enter edit mode for the todo', async () => {
      await homePage.startEditingTodo('Walk dog');
      await expect(homePage.todoEditor()).toHaveValue('Walk dog');
    });
  });

  test('Editing a todo and pressing Enter saves the new title', async ({ page }) => {
    await setAllureStory('Save Edited Todo');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodo('Walk dog');

    await step('Edit and save the todo title', async () => {
      await homeFlow.saveEditedTodo('Walk dog', 'Walk dog outside');
    });

    await step('Verify the updated title is visible', async () => {
      await expect(homePage.todoLabel('Walk dog outside')).toBeVisible();
      await expect(homePage.todoLabel('Walk dog')).toHaveCount(0);
    });
  });

  test('Editing a todo to an empty value removes it', async ({ page }) => {
    await setAllureStory('Remove Empty Edit');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodo('Walk dog');

    await step('Clear the title and save the edit', async () => {
      await homeFlow.saveEditedTodo('Walk dog', '');
    });

    await step('Verify the todo is removed', async () => {
      await expect(homePage.todoItems()).toHaveCount(0);
    });
  });

  test('Delete control removes only the selected todo', async ({ page }) => {
    await setAllureStory('Delete Todo');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodos(['Buy milk', 'Walk dog']);

    await step('Delete one todo item', async () => {
      await homeFlow.deleteTodo('Buy milk');
    });

    await step('Verify only the selected item is removed', async () => {
      await expect(homePage.todoItems()).toHaveCount(1);
      await expect(homePage.todoLabel('Walk dog')).toBeVisible();
      await expect(homePage.todoLabel('Buy milk')).toHaveCount(0);
    });
  });

  test('Clear completed removes completed todos and keeps active ones', async ({ page }) => {
    await setAllureStory('Clear Completed');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodos(['Buy milk', 'Walk dog', 'Read book']);
    await homeFlow.completeTodo('Buy milk');
    await homeFlow.completeTodo('Read book');

    await step('Clear all completed items', async () => {
      await homeFlow.clearCompleted();
    });

    await step('Verify only active todos remain', async () => {
      await expect(homePage.todoItems()).toHaveCount(1);
      await expect(homePage.todoLabel('Walk dog')).toBeVisible();
      await expect(homePage.todoLabel('Buy milk')).toHaveCount(0);
      await expect(homePage.todoLabel('Read book')).toHaveCount(0);
    });
  });

  test('Todos persist after page reload', async ({ page }) => {
    await setAllureStory('Persistence');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodos(['Buy milk', 'Walk dog']);
    await homeFlow.completeTodo('Buy milk');
    await homeFlow.saveEditedTodo('Walk dog', 'Walk dog outside');

    await step('Reload the page', async () => {
      await page.reload();
    });

    await step('Verify titles and completion state persist', async () => {
      await expect(homePage.todoLabel('Buy milk')).toBeVisible();
      await expect(homePage.todoLabel('Walk dog outside')).toBeVisible();
      await expect(homePage.todoToggle('Buy milk')).toBeChecked();
      await expect(homePage.todoToggle('Walk dog outside')).not.toBeChecked();
    });
  });

  test('Selected filter link reflects the current route', async ({ page }) => {
    await setAllureStory('Selected Filter Style');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodo('Buy milk');

    await step('Switch to the completed filter and verify selection state', async () => {
      await homeFlow.openFilter('Completed');
      await expect(homePage.filterLink('Completed')).toHaveClass(/selected/);
      await expect(homePage.filterLink('All')).not.toHaveClass(/selected/);
    });
  });

  test('Counter uses singular and plural text correctly', async ({ page }) => {
    await setAllureStory('Counter Grammar');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await step('Verify singular text for one todo', async () => {
      await homeFlow.addTodo('Buy milk');
      await expect(homePage.itemsLeftCounter()).toContainText('1 item left');
    });

    await step('Verify plural text after adding a second todo', async () => {
      await homeFlow.addTodo('Walk dog');
      await expect(homePage.itemsLeftCounter()).toContainText('2 items left');
    });
  });

  test('Whitespace only input is ignored', async ({ page }) => {
    await setAllureStory('Reject Blank Input');
    const homePage = new HomePage(page);

    await step('Submit only whitespace in the new todo input', async () => {
      await homePage.newTodoInput().fill('   ');
      await homePage.newTodoInput().press('Enter');
    });

    await step('Verify no todo is created', async () => {
      await expect(homePage.todoItems()).toHaveCount(0);
    });
  });

  test('Long todo text is displayed without breaking interactions', async ({ page }) => {
    await setAllureStory('Long Todo Text');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    const longTitle = 'Plan the quarterly roadmap review and capture all cross-team dependencies before Friday';

    await step('Add a long todo title', async () => {
      await homeFlow.addTodo(longTitle);
    });

    await step('Verify the full long title is visible and can be completed', async () => {
      await expect(homePage.todoLabel(longTitle)).toBeVisible();
      await homeFlow.completeTodo(longTitle);
      await expect(homePage.todoToggle(longTitle)).toBeChecked();
    });
  });

  test('Special characters are preserved after add edit and reload', async ({ page }) => {
    await setAllureStory('Special Characters');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    const originalTitle = 'Plan trip #1 & buy milk @ 5pm!';
    const updatedTitle = 'Plan trip #2 & buy snacks @ 6pm!';

    await step('Add and edit a todo with special characters', async () => {
      await homeFlow.addTodo(originalTitle);
      await homeFlow.saveEditedTodo(originalTitle, updatedTitle);
      await page.reload();
    });

    await step('Verify the updated text persists exactly', async () => {
      await expect(homePage.todoLabel(updatedTitle)).toBeVisible();
      await expect(homePage.todoLabel(originalTitle)).toHaveCount(0);
    });
  });

  test('Keyboard flow works for add edit save and toggle', async ({ page }) => {
    await setAllureStory('Keyboard Flow');
    const homePage = new HomePage(page);

    await step('Use the keyboard to add a todo', async () => {
      await homePage.newTodoInput().pressSequentially('Write tests');
      await homePage.newTodoInput().press('Enter');
      await expect(homePage.todoLabel('Write tests')).toBeVisible();
    });

    await step('Use the keyboard to edit and save the todo', async () => {
      await homePage.startEditingTodo('Write tests');
      const editor = homePage.todoEditor();
      await editor.press('Meta+A');
      await editor.pressSequentially('Write reliable tests');
      await editor.press('Enter');
      await expect(homePage.todoLabel('Write reliable tests')).toBeVisible();
    });

    await step('Toggle the todo using keyboard focus', async () => {
      await homePage.todoToggle('Write reliable tests').focus();
      await page.keyboard.press('Space');
      await expect(homePage.todoToggle('Write reliable tests')).toBeChecked();
    });
  });

  test('Escape cancels inline editing', async ({ page }) => {
    await setAllureStory('Cancel Edit');
    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.addTodo('Walk dog');

    await step('Start editing and cancel with Escape', async () => {
      await homeFlow.cancelEditedTodo('Walk dog', 'Walk dog outside');
    });

    await step('Verify the original title remains', async () => {
      await expect(homePage.todoLabel('Walk dog')).toBeVisible();
      await expect(homePage.todoLabel('Walk dog outside')).toHaveCount(0);
    });
  });
});