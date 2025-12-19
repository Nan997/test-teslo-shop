import test, { expect } from "@playwright/test";
import { POManager } from "./page/POManager";
import 'dotenv/config';


test("Permite iniciar sesión con credenciales válidas", async ({ page }) => {

    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(process.env.VALID_USER!, process.env.VALID_PASSWORD!);
    await expect(loginPage.validProducts.first()).toBeVisible();

})

test("Muestra error al iniciar sesión con contraseña incorrecta", async ({ page }) => {

    const poManager = new POManager(page)

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(process.env.VALID_USER!, process.env.INVALID_PASSWORD!);
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('Por favor revise la información ingresada.');

})

test("No se muestra el boton admin cuando el usuario tiene el rol user", async ({ page }) => {
    console.log(process.env.VALID_USER!, process.env.VALID_PASSWORD!)
    const poManager = new POManager(page)

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(process.env.VALID_USER!, process.env.VALID_PASSWORD!);

    await expect(loginPage.validProducts.first()).toBeVisible();

    await expect(page.locator("[routerlink='/admin']")).toHaveCount(0);

})

test("Debe mostrar la vista pantalla no encontrada cuando un usuario con rol user intenta acceder al dashboard", async ({ page }) => {
    console.log(process.env.VALID_USER!, process.env.VALID_PASSWORD!)
    const poManager = new POManager(page)

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(process.env.VALID_USER!, process.env.VALID_PASSWORD!);
    await expect(loginPage.validProducts.first()).toBeVisible();

    await page.goto(`${process.env.URL_FRONT}/admin/products`, {
        waitUntil: 'networkidle',
    });
    await expect(page.locator("app-not-found-page")).toBeVisible();


})



