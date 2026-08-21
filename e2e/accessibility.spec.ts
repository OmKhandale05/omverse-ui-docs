import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = [
  '/',
  '/enterprise',
  '/enterprise/patterns/object-detail-preview',
  '/enterprise/patterns/activity-audit-history',
  '/enterprise/patterns/saved-views',
  '/enterprise/floorplans/dashboard',
  '/enterprise/floorplans/list-report',
  '/enterprise/floorplans/object-detail',
  '/enterprise/floorplans/user-management',
  '/enterprise/floorplans/approval-queue',
  '/enterprise/floorplans/settings',
  '/enterprise/templates/work-items',
  '/enterprise/templates/users',
  '/enterprise/templates/approvals',
  '/docs/introduction',
  '/components/button',
  '/components/input',
  '/components/textarea',
  '/components/search-field',
  '/components/file-upload',
  '/components/segmented-control',
  '/components/split-button',
  '/components/inline-edit',
  '/components/transfer-list',
  '/components/saved-views',
  '/components/query-builder',
  '/components/column-manager',
  '/components/permission-matrix',
  '/components/activity-feed',
  '/components/notification-center',
  '/components/select',
  '/components/card',
  '/components/tabs',
  '/components/dialog',
  '/components/data-table',
  '/components/filter-bar',
  '/components/toolbar',
  '/components/tree-view',
  '/components/combobox',
  '/components/side-panel',
  '/components/command-bar',
  '/components/empty-state',
  '/components/audit-log',
  '/components/alert',
  '/examples?id=dashboard',
]

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
