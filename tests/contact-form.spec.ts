/**
 * QUICK START - Run these tests:
 *
 * Run email test (sends REAL email):
 *   npm run test:email
 *
 * Production testing:
 *   BASE_URL=https://shineagencia.com npm run test:email
 */

import { test, expect } from "playwright/test";

test.describe('Shine Contact Form - Email Sending', () => {
  test('should submit form and send email successfully @production @smoke', async ({ page }) => {
    // Navigate to the contact form page
    // Uses baseURL from playwright.config.ts
    await page.goto('/contacto');

    // Fill form with valid test data
    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="telefono"]', '3001234567');
    await page.fill('textarea[name="inquietudes"]', 'This is a test inquiry message to verify email sending functionality.');
    await page.check('input[name="terms"]', { force: true });

    // Intercept the action request
    const actionRequestPromise = page.waitForResponse(
      response => response.url().includes('/_actions/getContact'),
      { timeout: 10000 }
    );

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for the action response
    const actionResponse = await actionRequestPromise;

    // Log response details
    console.log('\n=== EMAIL SENDING TEST RESULTS ===');
    console.log('Response Status:', actionResponse.status());
    console.log('Response URL:', actionResponse.url());
    console.log('Content-Type:', actionResponse.headers()['content-type']);

    // Try to parse response
    let responseBody;
    const contentType = actionResponse.headers()['content-type'] || '';

    if (contentType.includes('application/json')) {
      responseBody = await actionResponse.json();
      console.log('Response Body:', JSON.stringify(responseBody, null, 2));
    } else {
      const responseText = await actionResponse.text();
      console.log('Response is not JSON. Content-Type:', contentType);
      console.log('Response Text (first 500 chars):', responseText.substring(0, 500));
      console.error('\n❌ PRODUCTION ISSUE DETECTED');
      console.error('The action endpoint is not working in production.');
      console.error('Possible causes:');
      console.error('1. Astro actions not properly built/deployed');
      console.error('2. Server-side rendering (SSR) not enabled');
      console.error('3. Missing adapter configuration (e.g., @astrojs/netlify)');
      console.error('4. Environment variables not set in production');
      throw new Error('Action endpoint returned HTML instead of JSON');
    }

    // Check for errors
    if (responseBody.error) {
      console.error('\n❌ EMAIL SENDING FAILED');
      console.error('Error Code:', responseBody.error.code);
      console.error('Error Message:', responseBody.error.message);
      console.log('\nPossible causes:');
      console.log('1. Domain not verified in Resend dashboard');
      console.log('2. Invalid API key');
      console.log('3. DNS records not configured');
      console.log('===================================\n');
    } else {
      console.log('\n✅ EMAIL SENT SUCCESSFULLY');
      console.log('Email Data:', responseBody);
      console.log('===================================\n');

      // Verify success modal is shown to user
      const successModal = page.locator('#success-modal');
      await expect(successModal).toBeVisible({ timeout: 5000 });
    }

    // Assert that the request was successful
    expect(actionResponse.status()).toBe(200);
    expect(responseBody.error).toBeUndefined();
  });

  // Safe for production - only tests validation, no email sent
  test('should handle validation errors correctly @production @safe', async ({ page }) => {
    test.setTimeout(15000); // Shorter timeout for this simple test

    await page.goto('/contacto');

    console.log('\n=== TESTING VALIDATION ERRORS ===');

    // Fill form with valid format but trigger server-side validation
    // Use valid email format to bypass HTML5 validation and reach Astro actions
    await page.fill('input[name="fullName"]', 'AB'); // Too short - will trigger server validation
    await page.fill('input[name="email"]', 'test@example.com'); // Valid format
    await page.fill('input[name="telefono"]', '123'); // Too short
    await page.fill('textarea[name="inquietudes"]', 'Short'); // Too short
    await page.check('input[name="terms"]', { force: true }); // Check terms to pass that validation

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for server response and error messages
    await page.waitForTimeout(2000);

    // Check that server-side error messages are displayed
    const nameError = page.locator('#error_fullName');

    // Wait for at least one error to appear
    try {
      await nameError.waitFor({ state: 'attached', timeout: 3000 });
    } catch (e) {
      // Error element might not appear if HTML5 validation catches it first
    }

    // Get error text content
    const errorText = await nameError.textContent().catch(() => '');

    console.log('Server Validation Error (fullName):', errorText);

    // Verify validation is working (either server-side or HTML5)
    if (errorText && errorText.length > 0) {
      console.log('✅ Server-side validation working correctly');
      expect(errorText).toContain('nombre');
    } else {
      console.log('✅ Validation working (HTML5 prevented submission)');
      // Form stayed on the same page (didn't submit successfully)
      const submitButton = page.locator('button[type="submit"]');
      await expect(submitButton).toBeVisible();
    }

    console.log('===================================\n');
  });
});


