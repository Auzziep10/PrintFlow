import { test, expect } from '@playwright/test';

// Global setup to ensure the app is running and responsive
test.beforeEach(async ({ page }) => {
    // Go to the local dashboard (assuming it's running on 3000)
    await page.goto('http://localhost:3000');
});

test.describe('Printflow End-to-End Tests', () => {

    test('User can navigate to Customers tab and open Add Customer modal', async ({ page }) => {
        // Navigate using the Sidebar
        await page.click('text=Customers');
        await expect(page).toHaveURL(/.*\/customers/);

        // Verify Customer table loads
        await expect(page.locator('h1:has-text("Customers")')).toBeVisible();

        // Check that we render mock clients
        await expect(page.locator('text=Wayne Enterprises')).toBeVisible();
    });

    test('User can open onboarding wizard and select services', async ({ page }) => {
        await page.goto('http://localhost:3000/onboarding');

        // Step 1
        await expect(page.locator('h2:has-text("Welcome to Printflow")')).toBeVisible();
        await page.fill('input[placeholder="e.g. Acme Screenprinting"]', 'E2E Print Shop');
        await page.click('button:has-text("Continue")');

        // Step 2
        await expect(page.locator('h2:has-text("Brand Identity")')).toBeVisible();
        await page.click('button:has-text("Next Step")');

        // Step 3
        await expect(page.locator('h2:has-text("Your Services")')).toBeVisible();
        await page.click('button:has-text("Screen Printing")');
        await page.click('button:has-text("Embroidery")');

        // Finish
        await page.click('button:has-text("Launch Workspace")');

        // Should redirect back to dashboard
        await expect(page).toHaveURL('http://localhost:3000/');
    });

    test('Customer Portal renders order details and accepts signature', async ({ page }) => {
        // Navigate to specific customer portal demo route
        await page.goto('http://localhost:3000/portal');

        // Verify order data
        await expect(page.locator('h1:has-text("Printflow Portal")')).toBeVisible();
        await expect(page.locator('text=Wayne Enterprises')).toBeVisible();

        // The signature input should be blurred/disabled initially until artworks are approved
        // In our mock, one is approved and one is not.
        await expect(page.locator('button:has-text("Approve Artwork")')).toBeVisible();

        // Click to approve the remaining unapproved artwork
        await page.click('button:has-text("Approve Artwork")');

        // Now type a signature
        await page.fill('input[placeholder="Wayne Enterprises"]', 'Bruce Wayne');

        // Submit Approval
        await page.click('button:has-text("Submit Approval")');

        // Assert success message displays
        await expect(page.locator('text=Success! Your artwork has been approved')).toBeVisible();

        // Assert Stripe pay button reveals itself
        await expect(page.locator('button:has-text("Pay Invoice Now")')).toBeVisible();
    });

    test('Kanban Board renders interactive drag/drop columns', async ({ page }) => {
        await page.goto('http://localhost:3000/kanban');

        await expect(page.locator('h1:has-text("Production Board")')).toBeVisible();

        // Look for the default columns
        await expect(page.locator('h3:has-text("Pending Art")')).toBeVisible();
        await expect(page.locator('h3:has-text("In Production")')).toBeVisible();

        // Click on an order card to open the Job Drawer
        await page.click('text=ORD-001');

        // The drawer should slide out with Audit Logs
        await expect(page.locator('h3:has-text("Audit Trail")')).toBeVisible();
        await expect(page.locator('text=Moved job to Pending Art')).toBeVisible();
    });

});
