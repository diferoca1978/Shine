import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit the contact form successfully with correct payload', async ({ page }) => {
    // Navigate to the contact page
    await page.goto('/contacto');

    // Prepare test data
    const testData = {
      fullName: 'Test User',
      email: 'test@example.com',
      telefono: '3001234567',
      inquietudes: 'This is a test message to verify email functionality.',
    };

    // Fill out the form
    await page.fill('input[name="fullName"]', testData.fullName);
    await page.fill('input[name="email"]', testData.email);
    await page.fill('input[name="telefono"]', testData.telefono);
    await page.fill('textarea[name="inquietudes"]', testData.inquietudes);

    // Check terms and conditions
    // The checkbox might be hidden or styled, so we might need to force click or click the label
    // Based on the code: <label for="terms">...<input id="terms"...
    await page.check('input[name="terms"]');

    // Intercept the request to verify the payload
    // The form action is likely handled by Astro Actions which might be a POST to the current URL or a specific endpoint
    // We'll listen for any POST request that looks like a form submission or the specific action URL
    const requestPromise = page.waitForRequest(request =>
      request.method() === 'POST' &&
      // Astro actions usually send to the same URL or /_actions/...
      // We can check if the post data contains our test data
      (request.postData()?.includes(testData.email) ?? false)
    );

    // Click the submit button
    await page.click('button[type="submit"]');

    // Wait for the request to be sent
    const request = await requestPromise;

    // Verify request payload
    // Astro actions send FormData. Playwright can parse it if it's standard, 
    // but sometimes it's easier to just check the raw post data text for existence of values
    const postData = request.postData();
    expect(postData).toContain(testData.fullName);
    expect(postData).toContain(testData.email);
    expect(postData).toContain(testData.telefono);
    expect(postData).toContain(testData.inquietudes);

    // Verify success state
    // The code shows a success modal with id "success-modal"
    const successModal = page.locator('#success-modal');
    await expect(successModal).toBeVisible({ timeout: 10000 });
  });
});
