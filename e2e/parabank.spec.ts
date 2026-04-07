import { test, expect } from '@playwright/test';

test('register new user', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/register.htm');
  
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  
  const inputs = page.locator('form input[type="text"], form input[type="password"]');
  const count = await inputs.count();
  console.log(`Found ${count} inputs`);
  
  await inputs.nth(0).fill('John');
  await inputs.nth(1).fill('Doe');
  await inputs.nth(2).fill('123 Main St');
  await inputs.nth(3).fill('New York');
  await inputs.nth(4).fill('NY');
  await inputs.nth(5).fill('10001');
  await inputs.nth(6).fill('555-1234');
  await inputs.nth(7).fill('12345');
  await inputs.nth(8).fill('johndoe');
  await inputs.nth(9).fill('password123');
  await inputs.nth(10).fill('password123');
  
  await page.getByRole('button', { name: 'Register' }).click();
  
  await page.waitForTimeout(3000);
  
  await expect(page.locator('.title')).toContainText('Welcome', { timeout: 10000 });
});

test('login and click buttons', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/');
  
  await page.locator('input[type="text"]').fill('johndoe');
  await page.locator('input[type="password"]').fill('password123');
  await page.getByRole('button', { name: 'Log In' }).click();
  
  await expect(page.locator('.title')).toContainText('Accounts Overview', { timeout: 10000 });
  
  await page.getByRole('link', { name: 'Open New Account' }).click();
  await expect(page.locator('.title')).toContainText('Open New Account');
  
  await page.goBack();
  
  await page.getByRole('link', { name: 'Transfer Funds' }).click();
  await expect(page.locator('.title')).toContainText('Transfer Funds');
});
