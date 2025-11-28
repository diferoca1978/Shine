import { test, expect } from '@playwright/test';

/**
 * Example test suite for Shine website homepage
 * This demonstrates basic Playwright testing patterns
 */
test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check that the page title is present
    await expect(page).toHaveTitle(/Shine/i);
  });

  test('should have navigation menu', async ({ page }) => {
    await page.goto('/');

    // Check that navigation is visible
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that page loads on mobile
    await expect(page).toHaveTitle(/Shine/i);
  });
});
