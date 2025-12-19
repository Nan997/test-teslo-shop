import test, { expect } from "@playwright/test";
import { POManager } from "./page/POManager";
import { productsData } from "./utils/data/create-products";
import { editProductData } from "./utils/data/edit-products";


test("Validar que se pueda crear un producto y se muestre en la tabla ", async ({ page }) => {

    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(process.env.USER_ADMIN!, process.env.PASSWORD_ADMIN!);
    await expect(loginPage.validProducts.first(), { message: "Login was not successful" }).toBeVisible();

    const dashboardPage = poManager.getDashboardPage();

    await dashboardPage.navigateToDahboard()
    await dashboardPage.navigateNewProduct()
    await expect(dashboardPage.title, { message: "The product form is not ready" }).toBeVisible();
    await dashboardPage.createProduct(productsData[0]);
    await page.waitForLoadState('networkidle');

    const { title } = productsData[0];

    await page.goto("http://localhost:4200/admin/products")
    await page.waitForLoadState('networkidle');

    await dashboardPage.searchProductTable(title)


})


test("Validar que se pueda editar un producto existente con datos correctos", async ({ page }) => {

    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(process.env.USER_ADMIN!, process.env.PASSWORD_ADMIN!);
    await expect(loginPage.validProducts.first(), { message: "Login was not successful" }).toBeVisible();

    const dashboardPage = poManager.getDashboardPage();

    await dashboardPage.navigateToDahboard()


    await dashboardPage.searchProductTable(editProductData[0].id!)


    await dashboardPage.editProduct(editProductData[0])

    const successAlert = page.locator('.alert-success');
    await expect(successAlert).toBeVisible({ timeout: 3000 });
})



test("Validar que no se pueda editar un producto con campos obligatorios faltantes", async ({ page }) => {

    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(process.env.USER_ADMIN!, process.env.PASSWORD_ADMIN!);
    await expect(loginPage.validProducts.first(), { message: "Login was not successful" }).toBeVisible();

    const dashboardPage = poManager.getDashboardPage();

    await dashboardPage.navigateToDahboard()


    await dashboardPage.searchProductTable(editProductData[1].id!)


    await dashboardPage.editProduct(editProductData[1])
    const formError = await page.locator('form .ng-invalid').count();
    expect(formError).toBeGreaterThan(0);


})