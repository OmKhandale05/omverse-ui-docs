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

test('checkbox overview starts with an interactive component preview', async ({ page }) => {
  await page.goto('/components/checkbox')
  const overview = page.getByRole('region', { name: 'Overview' })
  await expect(overview.getByText('Default checkbox')).toBeVisible()
  const checkbox = overview.getByRole('checkbox', { name: 'Email notifications' })
  await expect(checkbox).toBeChecked()
  await overview.getByText('Email notifications', { exact: true }).click()
  await expect(checkbox).not.toBeChecked()
  await expect(overview.getByText(/import \{ Checkbox \}/)).toBeVisible()
})

test('radio overview starts with an interactive component preview', async ({ page }) => {
  await page.goto('/components/radio')
  const overview = page.getByRole('region', { name: 'Overview' })
  await expect(overview.getByText('Default radio group')).toBeVisible()
  await overview.getByText('SMS', { exact: true }).click()
  await expect(overview.getByRole('radio', { name: /SMS/ })).toBeChecked()
  await expect(overview.getByText(/const \[notify, setNotify\]/)).toBeVisible()
})

test('enterprise route exposes its complete product story', async ({ page }) => {
  await page.goto('/enterprise')

  await expect(page).toHaveTitle('Enterprise | omverse-ui')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/enterprise$/)
  await expect(page.getByRole('heading', { level: 1, name: /One interface system/ })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: /system teams can trust/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Start building/ })).toHaveAttribute('href', '/docs/installation')
})

test('object detail pattern provides interactive preview and canonical documentation', async ({ page }) => {
  await page.goto('/enterprise/patterns/object-detail-preview')

  await expect(page.getByRole('heading', { level: 1, name: 'Object detail preview' })).toBeVisible()
  await expect(page.locator('.component-doc-section > header h2')).toHaveText(componentDocumentationSections)

  await page.getByRole('button', { name: /WRK-1838/ }).click()
  await expect(page.getByRole('complementary', { name: 'WRK-1838 preview' })).toContainText('Kinetic Health')
  await page.getByRole('button', { name: 'Quick preview' }).click()
  await expect(page.getByText('Attach the updated data-retention policy.')).toBeVisible()

  await page.getByRole('button', { name: /WRK-1821/ }).click()
  await expect(page.getByRole('heading', { level: 4, name: 'Preview restricted' })).toBeVisible()
})

test('activity audit pattern supports investigation and streaming controls', async ({ page }) => {
  await page.goto('/enterprise/patterns/activity-audit-history')

  await expect(page.getByRole('heading', { level: 1, name: 'Activity audit history' })).toBeVisible()
  await expect(page.locator('.component-doc-section > header h2')).toHaveText(componentDocumentationSections)

  await page.getByRole('searchbox', { name: 'Search audit history' }).fill('Policy service')
  await expect(page.getByText('1 matching events')).toBeVisible()
  await page.getByRole('button', { name: 'Pause' }).click()
  await expect(page.getByText('Live updates paused')).toBeVisible()
  await page.getByRole('button', { name: 'Simulate verified event' }).click()
  await expect(page.getByText('Resume the stream before receiving new events.')).toBeVisible()
})

test('saved views pattern restores context and recovers stale schemas', async ({ page }) => {
  await page.goto('/enterprise/patterns/saved-views')

  await expect(page.getByRole('heading', { level: 1, name: 'Saved views' })).toBeVisible()
  await expect(page.locator('.component-doc-section > header h2')).toHaveText(componentDocumentationSections)

  await page.getByRole('button', { name: /^Escalated accounts Shared view/ }).click()
  await expect(page.getByRole('region', { name: 'Applied view configuration' })).toContainText('Priority: Urgent')
  await page.getByRole('button', { name: 'Simulate schema change' }).click()
  await expect(page.getByRole('region', { name: 'Applied view configuration' }).getByRole('alert')).toContainText('View needs attention')
  await page.getByRole('button', { name: 'Repair view' }).click()
  await expect(page.getByText('View remapped to the current schema')).toBeVisible()
})

test('dashboard floorplan prioritizes health and actionable work', async ({ page }) => {
  await page.goto('/enterprise/floorplans/dashboard')

  await expect(page.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeVisible()
  await expect(page.locator('.component-doc-section > header h2')).toHaveText(componentDocumentationSections)
  await expect(page.getByLabel('Dashboard floorplan anatomy diagram').locator('.component-anatomy-marker')).toHaveCount(5)

  await page.getByRole('radio', { name: '30 days' }).click()
  await expect(page.getByText('5,432', { exact: true })).toBeVisible()

  await page.getByRole('button', { name: /Production access exception/ }).click()
  await expect(page.getByRole('status')).toHaveText('APR-2048 moved to the active review queue')
  await expect(page.getByRole('button', { name: /Production access exception/ })).toHaveCount(0)

  await page.getByRole('button', { name: 'Refresh', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Dashboard refreshed · all sources current')
})

test('list report floorplan preserves query and export scope', async ({ page, isMobile }) => {
  await page.goto('/enterprise/floorplans/list-report')

  await expect(page.getByRole('heading', { level: 1, name: 'List report' })).toBeVisible()
  await expect(page.locator('.component-doc-section > header h2')).toHaveText(componentDocumentationSections)
  const anatomy = page.getByLabel('List report floorplan anatomy diagram')
  await expect(anatomy.locator('.component-anatomy-marker')).toHaveCount(5)
  await expect.poll(() => anatomy.evaluate((element) => {
    const box = element.getBoundingClientRect()
    return Array.from(element.querySelectorAll('.component-anatomy-marker')).every((marker) => {
      const bounds = marker.getBoundingClientRect()
      return bounds.left >= box.left && bounds.right <= box.right && bounds.top >= box.top && bounds.bottom <= box.bottom
    })
  })).toBe(true)

  await page.getByLabel('Report risk').click()
  await page.getByRole('option', { name: 'High risk' }).click()
  await expect(page.getByText('4 records', { exact: true })).toBeVisible()

  await page.getByRole('button', { name: 'Columns', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Visible report columns' })).toBeVisible()

  await page.getByLabel('Report controls').getByRole('button', { name: 'Export', exact: true }).click()
  await expect(page.getByText('4 filtered records · CSV · identity fields masked')).toBeVisible()
  await page.getByRole('button', { name: 'Prepare export' }).click()
  await expect(page.getByRole('status')).toContainText('audit ID EXP-8842')

  await page.getByRole('button', { name: 'Clear report filters' }).click()
  await page.getByRole('button', { name: 'Next page' }).click()
  await expect(page.getByText('Showing 6–10 of 10')).toBeVisible()

  if (isMobile) {
    await expect.poll(() => page.locator('.enterprise-list-report-preview').evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(false)
    await expect.poll(() => page.locator('.enterprise-list-report-table-wrap').evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true)
  }
})

for (const floorplan of [
  { slug: 'object-detail', title: 'Object detail' },
  { slug: 'user-management', title: 'User management' },
  { slug: 'approval-queue', title: 'Approval queue' },
  { slug: 'settings', title: 'Settings' },
]) {
  test(`${floorplan.title} floorplan exposes complete documentation and contained anatomy`, async ({ page }) => {
    await page.goto(`/enterprise/floorplans/${floorplan.slug}`)
    await expect(page.getByRole('heading', { level: 1, name: floorplan.title })).toBeVisible()
    await expect(page.locator('.component-doc-section > header h2')).toHaveText(componentDocumentationSections)
    const anatomy = page.getByLabel(`${floorplan.title} floorplan anatomy diagram`)
    await expect(anatomy.locator('.component-anatomy-marker')).toHaveCount(5)
    await expect.poll(() => anatomy.evaluate((element) => {
      const box = element.getBoundingClientRect()
      return Array.from(element.querySelectorAll('.component-anatomy-marker')).every((marker) => {
        const bounds = marker.getBoundingClientRect()
        return bounds.left >= box.left && bounds.right <= box.right && bounds.top >= box.top && bounds.bottom <= box.bottom
      })
    })).toBe(true)
  })
}

test('object detail floorplan supports governed editing and read-only access', async ({ page }) => {
  await page.goto('/enterprise/floorplans/object-detail')
  await page.getByRole('button', { name: 'Edit incident' }).click()
  await page.getByLabel('Incident priority').click()
  await page.getByRole('option', { name: 'Critical' }).click()
  await page.getByRole('button', { name: 'Save changes' }).click()
  await expect(page.getByRole('status')).toContainText('Critical priority')
  await page.getByRole('button', { name: 'Preview read-only' }).click()
  await expect(page.getByText('Read-only access')).toBeVisible()
})

test('user management floorplan changes roles and locks accounts', async ({ page }) => {
  await page.goto('/enterprise/floorplans/user-management')
  await page.getByLabel('Role for Maya Chen').click()
  await page.getByRole('option', { name: 'Approver' }).click()
  await expect(page.getByRole('status')).toContainText('changed to Approver')
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Lock account' }).click()
  await expect(page.getByRole('status')).toContainText('Maya Chen locked')
})

test('approval queue requires rationale before recording a decision', async ({ page }) => {
  await page.goto('/enterprise/floorplans/approval-queue')
  await page.getByRole('button', { name: 'Approve', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Add reviewer rationale')
  await page.getByLabel('Decision rationale').fill('Evidence and policy checks verified.')
  await page.getByRole('button', { name: 'Approve', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('approved · decision evidence captured')
})

test('settings floorplan protects dirty navigation and saves an audit event', async ({ page }) => {
  await page.goto('/enterprise/floorplans/settings')
  await page.getByLabel('Workspace timezone').click()
  await page.getByRole('option', { name: /New York/ }).click()
  await page.getByRole('button', { name: 'Security' }).click()
  await expect(page.getByRole('status')).toContainText('Save or reset pending changes')
  await page.getByRole('button', { name: 'Save changes' }).click()
  await expect(page.getByRole('status')).toContainText('audit event SET-2918')
})

test('enterprise floorplans preserve a visible shell and panel outline hierarchy', async ({ page }) => {
  const floorplans = [
    ['dashboard', '.enterprise-dashboard-preview', '.enterprise-dashboard-panel'],
    ['list-report', '.enterprise-list-report-preview', '.enterprise-list-report-table-wrap'],
    ['object-detail', '.enterprise-object-detail-preview', '.enterprise-object-detail-card'],
    ['user-management', '.enterprise-user-management-preview', '.enterprise-user-detail'],
    ['approval-queue', '.enterprise-approval-queue-preview', '.enterprise-approval-review'],
    ['settings', '.enterprise-settings-preview', '.enterprise-settings-groups section'],
  ] as const

  for (const [slug, shellSelector, panelSelector] of floorplans) {
    await page.goto(`/enterprise/floorplans/${slug}`)
    await expect(page.locator(shellSelector)).toHaveCSS('border-top-width', '1px')
    await expect(page.locator(panelSelector).first()).toHaveCSS('border-top-width', '1px')
  }
})

test('work items template supports creation, layout, ownership, and status changes', async ({ page }) => {
  await page.goto('/enterprise/templates/work-items')
  await expect(page.getByRole('heading', { level: 1, name: 'Work items' })).toBeVisible()
  await expect(page.locator('.component-doc-section > header h2')).toHaveText(componentDocumentationSections)

  const anatomy = page.getByLabel('Work items template anatomy diagram')
  await expect(anatomy.locator('.component-anatomy-marker')).toHaveCount(5)
  await expect.poll(() => anatomy.evaluate((element) => {
    const box = element.getBoundingClientRect()
    return Array.from(element.querySelectorAll('.component-anatomy-marker')).every((marker) => {
      const bounds = marker.getBoundingClientRect()
      return bounds.left >= box.left && bounds.right <= box.right && bounds.top >= box.top && bounds.bottom <= box.bottom
    })
  })).toBe(true)

  await page.getByRole('radio', { name: 'Board' }).click()
  await expect(page.getByRole('list', { name: 'board of work items' })).toBeVisible()
  await page.getByRole('button', { name: 'New work item' }).click()
  await page.getByLabel('Title').fill('Verify regional access review')
  await page.getByRole('button', { name: 'Create item' }).click()
  await expect(page.getByRole('status')).toContainText('created and ready for triage')
  await page.getByLabel(/Owner for WRK-/).click()
  await page.getByRole('option', { name: 'Jon Bell' }).click()
  await expect(page.getByRole('status')).toContainText('assigned to Jon Bell')
})

test('users template connects directory, profile, access, and lifecycle outcomes', async ({ page }) => {
  await page.goto('/enterprise/templates/users')
  await expect(page.getByRole('heading', { level: 1, name: 'Users' })).toBeVisible()
  await expect(page.locator('.component-doc-section > header h2')).toHaveText(componentDocumentationSections)
  const anatomy = page.getByLabel('Users template anatomy diagram')
  await expect(anatomy.locator('.component-anatomy-marker')).toHaveCount(5)
  await page.getByRole('radio', { name: 'Access' }).click()
  await expect(page.getByText('Authentication compliant')).toBeVisible()
  await page.getByRole('radio', { name: 'Profile' }).click()
  await page.getByLabel('Template role for Maya Chen').click()
  await page.getByRole('option', { name: 'Approver' }).click()
  await expect(page.getByRole('status')).toContainText('audit event IAM-9921')
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Suspend access' }).click()
  await expect(page.getByRole('status')).toContainText('Maya Chen suspended')
})

test('approvals template enforces ownership, evidence, and rationale', async ({ page }) => {
  await page.goto('/enterprise/templates/approvals')
  await expect(page.getByRole('heading', { level: 1, name: 'Approvals' })).toBeVisible()
  await expect(page.locator('.component-doc-section > header h2')).toHaveText(componentDocumentationSections)
  const anatomy = page.getByLabel('Approvals template anatomy diagram')
  await expect(anatomy.locator('.component-anatomy-marker')).toHaveCount(5)
  await page.getByRole('button', { name: 'Approve request' }).click()
  await expect(page.getByRole('status')).toContainText('Claim APR-3048')
  await page.getByRole('button', { name: 'Claim review' }).click()
  await expect(page.getByRole('status')).toContainText('reviewer ownership recorded')
  await page.getByRole('button', { name: 'Approve request' }).click()
  await expect(page.getByRole('status')).toContainText('Add rationale')
  await page.getByLabel(/Decision rationale/).fill('All required evidence and time-bound controls verified.')
  await page.getByRole('button', { name: 'Approve request' }).click()
  await expect(page.getByRole('status')).toContainText('immutable decision DEC-7742 recorded')
})

for (const route of ['/components/button', '/components/input', '/components/textarea', '/components/search-field', '/components/file-upload', '/components/segmented-control', '/components/split-button', '/components/inline-edit', '/components/transfer-list', '/components/saved-views', '/components/query-builder', '/components/column-manager', '/components/permission-matrix', '/components/activity-feed', '/components/notification-center', '/components/select', '/components/card', '/components/tabs', '/components/dialog', '/components/data-table', '/components/filter-bar', '/components/toolbar', '/components/tree-view', '/components/combobox', '/components/side-panel', '/components/command-bar', '/components/empty-state', '/components/audit-log', '/components/alert']) {
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
