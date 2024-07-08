import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('signup form tests', () => {
  test('Test signup user from db-happy path', async ({ page }) => {
    await page.goto('localhost:8080/login')

    const existingUser = existingUsers[1]
    const link = page.locator('//a[contains(text(), "Signup")]')
    await link.click()
    await page.waitForTimeout(1000)
    await page.locator('#firstName').pressSequentially(existingUser.firstName)
    await page.locator('#lastName').pressSequentially(existingUser.lastName)
    await page.locator('#email').pressSequentially(existingUser.email)
    await page.locator('#password').pressSequentially(existingUser.password)
    const button =  page.locator('//button[contains(text(), "Submit")]')
    button.click()
    await page.waitForTimeout(1000)
    await page.waitForSelector('button:text("Log out")')
    await expect(page.locator(`text="Welcome ${existingUser.firstName} ${existingUser.lastName}"`)).toBeVisible()
    await expect(page.getByText('Log out')).toBeVisible()
  })
})
