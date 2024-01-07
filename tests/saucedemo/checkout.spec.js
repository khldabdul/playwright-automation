// @ts-check
const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

const baseUrl = 'https://www.saucedemo.com/';
const username = "standard_user";
const password = "secret_sauce";

test.describe('Checkout', () => {
  test('should success', async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForLoadState();
    await page.locator('#user-name').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();
    await page.waitForURL('**/inventory*');
    await page.waitForLoadState();
    await expect(page.locator('.title')).toHaveText('Products');
    await page.locator('.product_sort_container').selectOption('za');
    await page.locator('button', { hasText: 'Add to cart' }).first().click();
    await page.locator('#shopping_cart_container').click();
    await page.waitForURL('**/cart*');
    await page.waitForLoadState();
    await expect(page.locator('.title')).toHaveText('Your Cart');
    await page.locator('#checkout').click();
    await page.waitForURL('**/checkout-step-one*');
    await page.waitForLoadState();
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.locator('#first-name').fill(faker.person.firstName());
    await page.locator('#last-name').fill(faker.person.lastName());
    await page.locator('#postal-code').fill(faker.location.zipCode());
    await page.locator('#continue').click();
    await page.waitForURL('**/checkout-step-two*');
    await page.waitForLoadState();
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await page.locator('#finish').click();
    await page.waitForURL('**/checkout-complete*');
    await page.waitForLoadState();
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
    await expect(page.locator('.complete-header')).toBeVisible();
    await expect(page).toHaveScreenshot();
  });
})
