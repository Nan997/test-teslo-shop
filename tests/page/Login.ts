import { Locator, Page } from '@playwright/test'


export class LoginPage {
    page: Page;
    signInButton: Locator;
    username: Locator;
    passworad: Locator;
    validProducts: Locator;
    errorAlert: Locator;



    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByRole('button', { name: "Login" })
        this.username = page.getByPlaceholder("Correo electrónico")
        this.passworad = page.locator("input[type='password']")
        this.validProducts = page.locator("product-card div")
        this.errorAlert = page.getByRole('alert');

    }

    async goTo() {
        await this.page.goto("http://localhost:4200/auth/login")
    }

    async login(username: string, passworad: string) {
        await this.username.fill(username)
        await this.passworad.fill(passworad)
        await this.signInButton.click();

    }




}