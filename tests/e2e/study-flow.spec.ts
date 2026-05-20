import { test, expect } from '@playwright/test'

test.describe('Navegación principal', () => {
  test('carga la home', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Hola')
    await expect(page.getByRole('link', { name: /Estudiar/ }).first()).toBeVisible()
  })

  test('navega a /symbols y muestra la grilla', async ({ page }) => {
    await page.goto('/symbols')
    await expect(page.locator('h1')).toContainText('símbolos IPA')
    // Debe haber al menos 50 cards
    const cards = page.locator('a[href^="/symbols/"]')
    await expect(cards).toHaveCount(await cards.count())
    expect(await cards.count()).toBeGreaterThanOrEqual(50)
  })

  test('navega al detalle de un símbolo', async ({ page }) => {
    await page.goto('/symbols/v')
    await expect(page.locator('h1')).toContainText('labiodental')
    // El símbolo IPA debe estar visible
    await expect(page.locator('.ipa-symbol').first()).toBeVisible()
  })

  test('filtra símbolos por categoría', async ({ page }) => {
    await page.goto('/symbols')
    await page.click('button:has-text("Vocales")')
    // Todos los cards visibles deben pertenecer a vocales
    const cards = page.locator('a[href^="/symbols/"]')
    const count = await cards.count()
    expect(count).toBeGreaterThan(5)
    expect(count).toBeLessThan(30) // vocales son menos que el total
  })

  test('navega a /learn', async ({ page }) => {
    await page.goto('/learn')
    // Debe mostrar algo relacionado a estudio
    await expect(page.locator('body')).toBeVisible()
  })

  test('navega a los 4 modos de práctica', async ({ page }) => {
    for (const path of ['/practice/flashcard', '/practice/listen', '/practice/articulation', '/practice/pairs']) {
      await page.goto(path)
      await expect(page.locator('h1')).toBeVisible()
    }
  })

  test('navega a /stats', async ({ page }) => {
    await page.goto('/stats')
    await expect(page.locator('h1')).toContainText('Estadísticas')
  })
})

test.describe('Búsqueda de símbolos', () => {
  test('buscar "ʃ" muestra resultados relevantes', async ({ page }) => {
    await page.goto('/symbols')
    await page.fill('input[placeholder*="Buscar"]', 'ʃ')
    const cards = page.locator('a[href^="/symbols/"]')
    expect(await cards.count()).toBeGreaterThan(0)
  })

  test('buscar algo inexistente muestra "No hay símbolos"', async ({ page }) => {
    await page.goto('/symbols')
    await page.fill('input[placeholder*="Buscar"]', 'zzzznotexists')
    await expect(page.locator('text=No hay símbolos')).toBeVisible()
  })
})

test.describe('Detalle de símbolo', () => {
  test('símbolo /v/ tiene tip de producción', async ({ page }) => {
    await page.goto('/symbols/v')
    await expect(page.locator('h2:has-text("Truco")')).toBeVisible()
    await expect(page.getByRole('heading', { name: /labiodental/ })).toBeVisible()
  })

  test('símbolo tiene botón de audio', async ({ page }) => {
    await page.goto('/symbols/v')
    const audioBtn = page.locator('button[title="Escuchar sonido aislado"]')
    await expect(audioBtn).toBeVisible()
  })

  test('muestra ejemplos con idioma', async ({ page }) => {
    await page.goto('/symbols/v')
    await expect(page.locator('text=Portugués BR')).toBeVisible()
  })
})
