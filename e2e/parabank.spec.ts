import { test, expect } from "@playwright/test";

test("skip register and login directly", async ({ page }) => {
  const response = await page.goto("https://parabank.parasoft.com/");
  console.log(`Status: ${response?.status()}`);

  await page.waitForTimeout(3000);

  const title = await page.title();
  console.log(`Page title: ${title}`);

  const content = await page.content();
  console.log(`Home page content sample: ${content.substring(0, 500)}`);

  console.log("Process completed successfully");
});
