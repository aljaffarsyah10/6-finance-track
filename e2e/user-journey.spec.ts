import { test, expect } from "@playwright/test";

test.describe("MoneyTrack End-to-End User Flow", () => {
  test("1. Landing page and authentication navigation", async ({ page }) => {
    // Navigate to landing page
    await page.goto("/");
    await expect(page).toHaveTitle(/MoneyTrack/i);

    // Verify key elements
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // Navigate to login
    await page.click('a[href="/login"]');
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator("text=Masuk ke Akun")).toBeVisible();

    // Navigate to register
    await page.click('a[href="/register"]');
    await expect(page).toHaveURL(/.*register/);
    await expect(page.locator("text=Daftar Akun Baru")).toBeVisible();
  });

  test("2. Responsive navigation and theme toggle", async ({ page }) => {
    await page.goto("/");

    // Toggle theme
    const themeBtn = page.locator('button[title*="tema"]');
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
    }

    // Check dashboard shell
    await page.goto("/dashboard");
    await expect(page.locator("text=Ringkasan Finansial")).toBeVisible();
  });

  test("3. Core feature pages accessibility", async ({ page }) => {
    // Transactions page
    await page.goto("/transactions");
    await expect(page.locator("text=Daftar Transaksi")).toBeVisible();
    await expect(page.locator('input[placeholder*="Cari"]')).toBeVisible();

    // Accounts page
    await page.goto("/accounts");
    await expect(page.locator("text=Akun Keuangan")).toBeVisible();

    // Categories page
    await page.goto("/categories");
    await expect(page.locator("text=Kategori Transaksi")).toBeVisible();

    // Budgets page
    await page.goto("/budgets");
    await expect(page.locator("text=Anggaran Bulanan")).toBeVisible();

    // Reports page
    await page.goto("/reports");
    await expect(page.locator("text=Laporan & Analitik Finansial")).toBeVisible();

    // Settings page
    await page.goto("/settings");
    await expect(page.locator("text=Pengaturan Aplikasi")).toBeVisible();
  });
});
