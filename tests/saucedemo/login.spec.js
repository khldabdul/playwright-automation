// @ts-check
const { test, expect } = require('@playwright/test');

const baseUrl = 'https://www.saucedemo.com/';
const username = "standard_user";
const username_locked_out = "locked_out_user";
const password = "secret_sauce";

test.describe('Login', () => {
  test('with valid user should redirect to products page', async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForLoadState();
    await page.locator('#user-name').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();
    await page.waitForURL('**/inventory*');
    await page.waitForLoadState();
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page).toHaveScreenshot();
  });

  test('with locked out user should throw error message', async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForLoadState();
    await page.locator('#user-name').fill(username_locked_out);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });

  test('with invalid credential should throw error message', async ({ page }) => {
    await page.goto(baseUrl);
    await page.waitForLoadState();
    await page.locator('#user-name').fill('standart_user');
    await page.locator('#password').fill('secret');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });
});
