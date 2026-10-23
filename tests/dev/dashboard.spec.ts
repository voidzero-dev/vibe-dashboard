import { expect, test } from "playwright/test";

test("vp dev renders the dashboard and lazy routes", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  const response = await page.goto("/");
  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", { name: "VoidZero Dashboard", exact: true }),
  ).toBeVisible();

  await page
    .getByRole("main")
    .getByRole("link", { name: /Minification Benchmarks/ })
    .click();
  await expect(page).toHaveURL("/#/minification");
  const heading = page.getByRole("heading", { name: "Minification Benchmarks", exact: true });
  await expect(heading).toBeVisible();

  const reloadResponse = await page.reload();
  expect(reloadResponse?.ok()).toBe(true);
  await expect(heading).toBeVisible();
  expect(errors).toEqual([]);
});
