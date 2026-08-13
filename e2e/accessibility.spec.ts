import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = ['/', '/docs/introduction', '/components/button', '/components/dialog', '/examples?id=dashboard']

for (const route of routes) {
  test(`${route} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(route)
    await page.locator('main').first().waitFor()

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const serious = results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious')
    expect(serious, serious.map(({ id, help }) => `${id}: ${help}`).join('\n')).toEqual([])
  })
}
