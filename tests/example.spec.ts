import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://usany.github.io/')

  await expect(page).toHaveTitle(/React/)
})

test('get started link', async ({ page }) => {
  await page.goto('https://usany.github.io/')

  // Click the get started link.
  await expect(
    page.getByRole('button', {
      name: 'sign in',
    }),
  ).toBeVisible()

  // Expects page to have a heading with the name of Installation.
  // await expect(
  //   page.getByRole('heading', { name: 'Installation' }),
  // ).toBeVisible()
})
