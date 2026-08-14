import { expect, test } from '@playwright/test'

const componentDocumentationSections = [
  'Overview',
  'Anatomy',
  'When to use',
  'When not to use',
  'Variants',
  'States',
  'Behavior',
  'Accessibility',
  'Content guidelines',
  'Examples',
  'Props / API',
  'Related components',
]

test('navigates documentation and exposes route metadata', async ({ page }) => {
  await page.goto('/components/button')

  await expect(page).toHaveTitle('Button | omverse-ui')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/components\/button$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Button' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Input/ }).last()).toBeVisible()

  await page.getByRole('link', { name: /Input/ }).last().click()
  await expect(page).toHaveURL(/\/components\/input$/)
  await expect(page).toHaveTitle('Input | omverse-ui')
})

test('enterprise route exposes its complete product story', async ({ page }) => {
  await page.goto('/enterprise')

  await expect(page).toHaveTitle('Enterprise | omverse-ui')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/enterprise$/)
  await expect(page.getByRole('heading', { level: 1, name: /One interface system/ })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: /system teams can trust/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Start building/ })).toHaveAttribute('href', '/docs/installation')
})

for (const route of ['/components/button', '/components/input', '/components/select', '/components/card', '/components/tabs', '/components/dialog', '/components/data-table', '/components/filter-bar', '/components/toolbar', '/components/tree-view', '/components/combobox', '/components/side-panel']) {
  test(`${route} follows the canonical twelve-section structure`, async ({ page, isMobile }) => {
    await page.goto(route)

    const sectionHeadings = page.locator('.component-doc-section > header h2')
    const tableOfContents = page.locator('aside.component-doc-toc[aria-label="On this page"]')
    await expect(sectionHeadings).toHaveText(componentDocumentationSections)
    await expect(tableOfContents).toBeAttached()
    await expect(tableOfContents).toBeVisible({ visible: !isMobile })
  })
}

test('component documentation highlights the active section', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop table of contents is hidden on mobile')
  await page.goto('/components/button')

  const main = page.locator('main#main-content')
  const anatomyLink = page.locator('.component-doc-toc a[href="#anatomy"]')
  await expect(page.locator('.component-doc-toc a[href="#overview"]')).toHaveAttribute('aria-current', 'location')

  await main.evaluate((element) => {
    const anatomy = element.querySelector<HTMLElement>('#anatomy')
    if (anatomy) element.scrollTop = anatomy.offsetTop - 80
  })

  await expect(anatomyLink).toHaveAttribute('aria-current', 'location')
})

test('search opens a component page', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop command-palette flow')
  await page.goto('/docs/introduction')

  await page.getByRole('button', { name: /Search/ }).click()
  const search = page.getByPlaceholder('Search components, docs, examples…')
  await search.fill('Popover')
  await page.getByRole('option', { name: 'Popover' }).click()

  await expect(page).toHaveURL(/\/components\/popover$/)
})

test('theme preference persists across reloads', async ({ page }) => {
  await page.goto('/docs/introduction')
  const toggle = page.getByRole('button', { name: /Switch to (dark|light) mode/ })
  await toggle.click()
  const dark = await page.locator('html').evaluate((element) => element.classList.contains('dark'))

  await page.reload()
  await expect.poll(() => page.locator('html').evaluate((element) => element.classList.contains('dark'))).toBe(dark)
})

test('example tabs are deep-linkable', async ({ page }) => {
  await page.goto('/examples?id=pricing')
  await expect(page.getByRole('heading', { level: 1, name: 'Examples' })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'Pricing' })).toBeVisible()

  await page.getByRole('tab', { name: 'Forms' }).click()
  await expect(page).toHaveURL(/\/examples\?id=forms$/)
})

test('mobile navigation opens, closes with Escape, and prevents hidden focus targets', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile navigation flow')
  await page.goto('/components/button')

  const trigger = page.getByRole('button', { name: 'Open navigation' })
  await trigger.click()
  await expect(page.getByRole('dialog', { name: 'omverse-ui' })).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'omverse-ui' })).toHaveCount(0)
  await expect(trigger).toBeFocused()
})
