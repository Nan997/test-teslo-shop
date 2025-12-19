import { test, request, expect } from "@playwright/test";
import { ProductApi } from './utils/api/products.api';
import { fakeProducts } from "./utils/data/fakedata";



test("Debe mostrar en pantalla los productos devueltos por la API", async ({ page }) => {
    const apiContext = await request.newContext();
    const productApi = new ProductApi(apiContext)
    const productsResponse = await productApi.getProducts(9, 0);
    await page.goto(process.env.URL_FRONT!)
    const productCards = page.locator('product-card');

    await expect(productCards).toHaveCount(productsResponse.products.length);


})

test("Debe mostrar los productos correctos en la segunda página (mocked API)", async ({ page }) => {

    await page.route('**/api/products?limit=9&offset=9&gender=*', async route => {
        console.log("Intercepted request:", route.request().url());
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                count: 52,
                pages: 6,
                products: fakeProducts
            }),
        });
    });

    await page.goto(process.env.URL_FRONT!);



    const buttons = page.locator('.join button');
    await page.waitForSelector('.join button');

    const count = await buttons.count();
    expect(count).toBeGreaterThan(1);

    await Promise.all([
        page.waitForResponse('**/api/products?limit=9&offset=9&gender=*'),
        buttons.nth(1).click()
    ]);



    const titlesLocator = page.locator(".card-body h2");
    const descriptionsLocator = page.locator(".card-body p");

    const uiTitles = await titlesLocator.allInnerTexts();
    const uiDescriptions = await descriptionsLocator.allInnerTexts();

    uiTitles.forEach((title, i) => {
        expect(title).toContain(fakeProducts[i].title);
    });

    uiDescriptions.forEach((desc, i) => {
        expect(desc).toContain(fakeProducts[i].description);
    });

});

test("El paginador muestra productos diferentes al cambiar de página", async ({ page }) => {

    await page.goto(process.env.URL_FRONT!);

    const pagButtons = page.locator(".join button");
    await pagButtons.first().waitFor();

    const totalPages = await pagButtons.count();

    const getTitles = async () => await page.locator(".card-body h2").allInnerTexts();

    const firstPageTitles = await getTitles();

    expect(firstPageTitles.length).toBeGreaterThan(0);

    if (totalPages > 2) {
        const middleIndex = Math.floor(totalPages / 2);
        await pagButtons.nth(middleIndex).click();
        await page.waitForLoadState("networkidle");
        const middlePageTitles = await getTitles();
        expect(middlePageTitles).not.toEqual(firstPageTitles);
    }

    await pagButtons.nth(totalPages - 1).click();
    await page.waitForLoadState("networkidle");

    const lastPageTitles = await getTitles();
    expect(lastPageTitles).not.toEqual(firstPageTitles);



})




test('API retorna solo productos de hombres: men', async () => {
    const apiContext = await request.newContext();
    const productApi = new ProductApi(apiContext);

    const response = await productApi.getProducts(9, 0, 'men');

    expect(response.products.length).toBeGreaterThan(0);

    response.products.forEach(product => {
        expect(['unisex', 'men']).toContain(product.gender);

    });
});


test('API retorna solo productos de mujeres:woman', async () => {
    const apiContext = await request.newContext();
    const productApi = new ProductApi(apiContext);

    const response = await productApi.getProducts(9, 0, 'women');

    expect(response.products.length).toBeGreaterThan(0);

    response.products.forEach(product => {
        expect(['women', 'unisex']).toContain(product.gender);
    });
});

test('API retorna solo productos de niños:kid', async () => {
    const apiContext = await request.newContext();
    const productApi = new ProductApi(apiContext);

    const response = await productApi.getProducts(9, 0, 'kid');

    expect(response.products.length).toBeGreaterThan(0);

    response.products.forEach(product => {
        expect(['unisex', 'kid']).toContain(product.gender);
    });
});



