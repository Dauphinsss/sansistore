import { test, expect } from '@playwright/test';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot({
      fullPage: true,
    });

    await testInfo.attach('full-page-screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });
  }
});

test.describe('Cart - Carrito', () => {
  test('should display cart items when user is authenticated', async ({
    page,
  }) => {
    await page.goto('/login');

    const emailField = page.getByLabel('Correo electrónico');
    const passwordField = page.getByLabel('Contraseña');

    await emailField.fill('juan.paredes@est.umss.edu');
    await passwordField.fill('password123');

    await page
      .getByRole('button', { name: 'Iniciar sesión', exact: true })
      .click();

    await expect(page).toHaveURL('/me');

    await page.goto('/cart');

    await expect(
      page.getByRole('heading', { name: 'Mi Carrito' })
    ).toBeVisible();

    await expect(page.getByText('Yogurt Test Sin Resenas')).toBeVisible({
      timeout: 10000,
    });
  });

  test('should show empty cart message when user has no items', async ({
    page,
  }) => {
    await page.goto('/login');

    const emailField = page.getByLabel('Correo electrónico');
    const passwordField = page.getByLabel('Contraseña');

    await emailField.fill('carlos.docente@est.umss.edu');
    await passwordField.fill('password123');

    await page
      .getByRole('button', { name: 'Iniciar sesión', exact: true })
      .click({ timeout: 1000 });

    await page.goto('/cart');

    await expect(
      page.getByRole('heading', { name: 'Mi Carrito' })
    ).toBeVisible();

    await expect(page.getByText('Tu carrito está vacío')).toBeVisible({
      timeout: 1000,
    });
  });

  test('should show "No autenticado" when accessing cart without login', async ({
    page,
  }) => {
    await page.goto('/cart');

    await expect(page.getByText('No autenticado')).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Iniciar sesión' })
    ).toBeVisible();
  });
});
