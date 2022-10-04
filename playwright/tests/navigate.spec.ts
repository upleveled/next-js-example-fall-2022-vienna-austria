import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.locator('h1')).toHaveText('Home');

  await expect(
    page.locator(
      `img[alt="Zebra with meme sunglasses saying 'u wot m8' with a elftroll in the foreground"] >> nth=0`,
    ),
  ).toBeVisible();

  await page.locator('a:has-text("Animals")').click();
  await expect(page).toHaveURL('http://localhost:3000/animals');
  await expect(page.locator('h1')).toHaveText('Animals');

  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveCount(5);
  await expect(page.locator('[data-test-id^="animal-type-"] >> h2')).toHaveText(
    ['Ralph', 'Evelina', 'Otto', 'Mayo', 'Kaaaarl'],
  );
  await page.locator('a:has-text("Fruits")').click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await expect(page.locator('[data-test-id^="fruit-"]')).toHaveCount(3);
  await expect(page.locator('[data-test-id^="fruit-"] > h2')).toHaveText([
    'Papaya',
    'Mango',
    'Avocado',
  ]);
  await page.locator('text=Papaya').click();
  await expect(page).toHaveURL('http://localhost:3000/fruits/1');

  await page.locator('button', { hasText: '⭐️ +' }).click({
    clickCount: 3,
  });
  await page.locator('text=Fruits').click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');
  await expect(page.locator('[data-test-id="fruit-1"] >> div')).toHaveText(
    '🥔 ⭐️ 3',
  );
  await expect(page.locator('[data-test-id="fruit-1"] >> div')).toContainText(
    '3',
  );
  await expect(page.locator('[data-test-id="fruit-1"] >> div')).toHaveText(/3/);
});
