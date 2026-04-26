import { expect, test } from '@playwright/test';

test.describe('@smoke navegación principal', () => {
  test('abre la página y navega a las secciones lazy', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Gestión de prospectos y oferta académica' })).toBeVisible();

    await page.getByRole('link', { name: 'Programas' }).click();
    await expect(page.getByRole('heading', { name: 'Programas académicos' })).toBeVisible();

    await page.getByRole('link', { name: 'Eventos' }).click();
    await expect(page.getByRole('heading', { name: 'Eventos Javeriana' })).toBeVisible();

    await page.getByRole('link', { name: 'Inscripción' }).click();
    await expect(page.getByRole('heading', { name: 'Registro de interés' })).toBeVisible();

    await page.getByRole('link', { name: 'Leads' }).click();
    await expect(page.getByRole('heading', { name: 'Leads registrados' })).toBeVisible();

    await page.getByRole('link', { name: 'API Docs' }).click();
    await expect(page.getByRole('heading', { name: 'Documentación API' })).toBeVisible();
  });
});