import { expect, Locator, Page } from "@playwright/test";
import { ProductData } from "../interfaces/CreateProduct";


export class DashboardPage {


    adminPanel: Locator
    page: Page
    newProduct: Locator
    title: Locator
    slug: Locator
    description: Locator
    price: Locator
    stock: Locator
    tags: Locator
    gender: Locator
    sizes: Locator
    image: Locator
    save: Locator
    select: Locator
    buttonsPaginator: Locator
    nameProduct: Locator

    constructor(page: Page) {
        this.page = page;
        this.adminPanel = page.locator("[routerlink='/admin']")
        this.newProduct = page.getByRole("button", { name: " Nuevo producto " })

        this.title = page.getByPlaceholder("Título")
        this.slug = page.getByPlaceholder("Slug")
        this.description = page.getByPlaceholder("Descripción")
        this.price = page.getByPlaceholder("Precio")
        this.stock = page.getByPlaceholder("Inventario")
        this.tags = page.getByPlaceholder("Tags")
        this.gender = page.locator("div.grid.grid-cols-4.gap-2 button")
        this.sizes = page.locator("div.grid.grid-cols-6.gap-2 button")
        this.image = page.locator('input[type="file"]');
        this.save = page.getByRole("button", { name: "Guardar " })
        this.select = page.locator(".select")
        this.buttonsPaginator = page.locator(".join button")
        this.nameProduct = page.locator("td div a")
    }


    async navigateToDahboard() {
        await this.adminPanel.click();

    }
    async navigateNewProduct() {

        await this.newProduct.click()


    }


    async searchProductTable(product: string) {
        await this.select.selectOption("100");

        const rows = this.page.locator("table tbody tr");
        await expect(rows.first()).toBeVisible();

        const productRow = rows.filter({
            hasText: new RegExp(product, "i"),
        });

        if (await productRow.count() > 0) {
            const productLink = productRow.first().locator("td div a");
            await expect(productLink).toBeVisible();
            await productLink.click();
            await this.page.waitForLoadState('networkidle');

            return;
        }

        const totalPages = await this.buttonsPaginator.count();

        for (let i = 0; i < totalPages - 1; i++) {
            const firstRowBefore = await rows.first().textContent();

            await this.buttonsPaginator.nth(i + 1).click();

            await expect.poll(async () => {
                return await rows.first().textContent();
            }).not.toBe(firstRowBefore);

            if (await productRow.count() > 0) {
                const productLink = productRow.first().locator("td div a");
                await expect(productLink).toBeVisible();
                await productLink.click();

                await this.page.waitForLoadState('networkidle');

                return;
            }
        }

        throw new Error(`The product "${product}" was not found in the table`);
    }





    async createProduct(data: ProductData) {

        await this.title.fill(data.title);
        await this.slug.fill(data.slug);
        await this.description.fill(data.description);
        await this.price.fill(data.price.toString());
        await this.stock.fill(data.stock.toString());
        await this.tags.fill(data.tags);
        await this.gender.filter({ hasText: data.gender }).click();

        for (const size of data.sizes) {
            await this.sizes.getByText(size, { exact: true }).click();
        }
        await this.image.setInputFiles(data.image)
        await this.save.click()


    }

    async editProduct(data: Partial<ProductData>) {

        if (data.title !== undefined) await this.title.fill(data.title);
        if (data.slug !== undefined) await this.slug.fill(data.slug);
        if (data.description !== undefined) await this.description.fill(data.description);
        if (data.price !== undefined) await this.price.fill(data.price.toString());
        if (data.stock !== undefined) await this.stock.fill(data.stock.toString());
        if (data.tags) await this.tags.fill(data.tags);

        if (data.gender) {
            await this.gender
                .filter({ hasText: data.gender })
                .first()
                .click();
        }


        if (data.sizes?.length) {
            let buttonsSelected = this.page.locator("div.grid.grid-cols-6.gap-2 button.btn-secondary");
            let count = await buttonsSelected.count();

            for (let i = 0; i < count; i++) {
                await this.page.locator("div.grid.grid-cols-6.gap-2 button.btn-secondary").first().click();
            }

            for (const size of data.sizes) {
                await this.sizes.getByText(size, { exact: true }).click();
            }
        }




        if (data.image) await this.image.setInputFiles(data.image);

        await this.save.click();




    }


}