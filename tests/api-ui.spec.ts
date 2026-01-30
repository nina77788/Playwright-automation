import { test, expect } from "@playwright/test";

test("Reqres API + UI integration demo", async ({ playwright, page }) => {
  // 1️⃣ Create API context with headers
  const apiContext = await playwright.request.newContext({
    extraHTTPHeaders: {
      Accept: "application/json",
      "User-Agent": "Playwright-Test",
    },
  });

  // 2️⃣ API: Get user list
  const response = await apiContext.get("https://reqres.in/api/users?page=1");
  expect(response.status()).toBe(200);

  const body = await response.json();
  const firstUser = body.data[0];

  console.log("API user:", firstUser.first_name);

  // 3️⃣ UI: Open the Reqres official website
  await page.goto("https://reqres.in");

  await page.getByText("Users").click();

  // 4️⃣ UI verification
  await expect(page.locator("body")).toContainText(firstUser.first_name);
});
