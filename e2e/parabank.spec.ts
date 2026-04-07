import { test, expect } from '@playwright/test';

test('register new user', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/register.htm');
  
  await page.waitForTimeout(2000);
  
  const firstName = page.locator('input').first();
  await firstName.fill('John');
  
  const inputs = page.locator('input');
  const count = await inputs.count();
  console.log(`Total inputs: ${count}`);
  
  await page.locator('input').nth(1).fill('Doe');
  await page.locator('input').nth(2).fill('123 Main St');
  await page.locator('input').nth(3).fill('New York');
  await page.locator('input').nth(4).fill('NY');
  await page.locator('input').nth(5).fill('10001');
  await page.locator('input').nth(6).fill('555-1234');
  await page.locator('input').nth(7).fill('12345');
  await page.locator('input').nth(8).fill('johndoe');
  await page.locator('input').nth(9).fill('password123');
  await page.locator('input').nth(10).fill('password123');
  
  await page.getByRole('button', { name: 'Register' }).click();
  
  await page.waitForTimeout(2000);
  
  const title = await page.locator('.title').textContent();
  console.log(`Title: ${title}`);
});

test('login and click buttons', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/');
  
  await page.waitForLoadState('networkidle');
  
  const usernameInput = page.getByLabel('Username');
  const passwordInput = page.getByLabel('Password');
  
  await usernameInput.fill('admin');
  await passwordInput.fill('admin123');
  
  console.log(`Filled username and password`);
  
  await page.getByRole('button', { name: 'Log In' }).click();
  
  await page.waitForLoadState('networkidle');
  
  const title = await page.locator('.title').textContent();
  console.log(`Title after login: ${title}`);
  
  await expect(page.locator('.title')).toContainText('Accounts Overview', { timeout: 10000 });
  
  await page.getByRole('link', { name: 'Open New Account' }).click();
  await expect(page.locator('.title')).toContainText('Open New Account');
  
  await page.goBack();
  
  await page.getByRole('link', { name: 'Transfer Funds' }).click();
  await expect(page.locator('.title')).toContainText('Transfer Funds');
});
