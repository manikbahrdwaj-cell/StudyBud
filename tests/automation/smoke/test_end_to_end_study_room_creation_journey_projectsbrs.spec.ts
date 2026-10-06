import { test, expect } from '@playwright/test';

// Read runtime test data
const testData = JSON.parse(process.env.VTEST_TEST_DATA || '{}').values || {};

test('End-to-end: Study Room Creation Journey', async ({ page }) => {
  // Step 1: Open '/login'
  await page.goto(new URL('/login', process.env.VTEST_APP_BASE_URL).href);
  // Step 2: Enter username into the Email field
  await page.locator('#username').fill(process.env.VTEST_DATA_USERNAME);
  // Step 3: Enter password into the Password field
  await page.locator('#password').fill(process.env.VTEST_DATA_PASSWORD);
  // Step 4: Click the 'Submit' button
  await page.getByRole('button', { name: 'Login' }).click();

  // Assert that user is redirected to the homepage
  await expect(page).toHaveURL(new RegExp('/')); // Expecting to land on homepage

  // Step 5: Open the address '/create-room'
  await page.goto(new URL('/create-room', process.env.VTEST_APP_BASE_URL).href);
  // Step 6: Enter 'Study Group' into the Room Name field
  await page.locator('#id_name').fill(testData['room_name']);
  // Step 7: Select 'Python' as the Topic
  await page.locator('input[name=topic]').fill(testData['topic']);
  // Step 8: Enter 'A group for Python enthusiasts' into the Description field
  await page.locator('#id_description').fill(testData['description']);
  // Step 9: Click the 'Submit' button
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 10: Assert that new study room is created and navigate to it
  await expect(page).toHaveURL(new RegExp('/room/[0-9]+')); // Assert that we are redirected to room page
});