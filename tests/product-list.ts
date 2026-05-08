import { test, expect } from '@playwright/test';

test.afterEach(async ({ page }, testInfo) => {
    const screenshot = await page.screenshot({
        fullPage: true,
    });

    await testInfo.attach('full-page-screenshot', {
        body: screenshot,
        contentType: 'image/png',
    });
});


test.describe('Avaiable product list', () => {
  test('load products page', async ({ page }) => {
    await page.goto('/productos');

    await expect(page).toHaveTitle(/Productos | Sansistore/);

    await expect(page.getByRole('heading', { name: 'Productos disponibles' })).toBeVisible();


    await expect(page.getByRole('button', { name: 'Categoría' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Solo Ofertas' })).toBeVisible();

    
    }); 


    test('Ofertas', async ({ page }) => {
    await page.goto('/productos');

    await (page.getByRole('button', { name: 'Solo Ofertas' }).click());
    await expect(page.getByText(/Mocochinchi Test with Offer/)).toBeVisible();
    
    }); 

    test('Categorias', async ({ page }) => {
    await page.goto('/productos');
    await (page.getByRole('button', { name: 'Categoría' }).click());
    await expect(page.getByText(/Lacteos/)).toBeVisible();
    await expect(page.getByText(/Bebidas/)).toBeVisible();
    
    }); 

    test('Buscar', async ({ page }) => {
    await page.goto('/productos');

    await (page.getByRole('textbox', { name: 'Buscar Productos' }).fill('Leche'));
    await (page.getByRole('button', { name: 'Leche Test In Stock' }).click());
    await expect(page.getByText(/9\.99/)).toBeVisible();
    }); 

});
