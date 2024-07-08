import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('Test login with an existing account', async ({ page }) => {
    await page.goto('localhost:8080/login')

    const existingUser = existingUsers[1]

    await page
        .locator('#email')
        .pressSequentially(existingUser.email)

    await page
        .locator('#password')
        .pressSequentially(existingUser.password)

    // Login button
    const button =  page.locator('//button[contains(text(), "Login")]')
    // Click on the button
    button.click()

    await page.waitForTimeout(1000)

    await page.waitForSelector('button:text("Log out")')

    await expect(page.locator(`text="Welcome ${existingUser.firstName} ${existingUser.lastName}"`)).toBeVisible()

    await expect(page.getByText('Log out')).toBeVisible()
  })
})
