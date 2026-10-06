import { test, expect } from '@playwright/test';

test('End-to-end: User login process', async ({ page }) => {
  // Step 1: Open the application at '/' (home).
  await page.goto(new URL('/', process.env.VTEST_APP_BASE_URL).href);
  // Step 1 Expected Result: Homepage loads successfully.
  await expect(page).toHaveURL(new RegExp('/'));

  // Step 2: Open the address '/login' (loginPage) directly.
  await page.goto(new URL('/login', process.env.VTEST_APP_BASE_URL).href);
  // Step 2 Expected Result: Login page loads successfully.
  await expect(page).toHaveURL(new RegExp('/login'));

  // Step 3: Enter 'user@example.com' into the email field.
  await page.locator('#username').fill(process.env.VTEST_DATA_USERNAME);
  // Step 3 Expected Result: Email field is populated with 'user@example.com'.
  await expect(page.locator('#username')).toHaveValue(process.env.VTEST_DATA_USERNAME);

  // Step 4: Enter 'password123' into the Password field.
  await page.locator('#password').fill(process.env.VTEST_DATA_PASSWORD);
  // Step 4 Expected Result: Password field is populated with 'password123'.
  await expect(page.locator('#password')).toHaveValue(process.env.VTEST_DATA_PASSWORD);

  // Step 5: Click the 'Login' button.
  await page.getByRole('button', { name: 'Login' }).click();
  // Step 5 Expected Result: User is redirected to the authenticated application experience.
  await expect(page).toHaveURL(new RegExp('/'));  // Assuming that the user is redirected back to home after login.

  // Step 6: Access a feature that requires authentication.
  await page.getByRole('link', { name: 'Browse Topics' }).click();
  // Step 6 Expected Result: Authenticated feature loads successfully.
  await expect(page).toHaveURL(new RegExp('/some_authenticated_feature'));  // This should be replaced with actual feature URL.
});