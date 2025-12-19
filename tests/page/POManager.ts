import { Page } from "@playwright/test";
import { LoginPage } from "./Login";
import { DashboardPage } from "./DashboardPage";



export class POManager {

    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    page: Page;
    // ordersHistoryPage: OrdersHistoryPage;
    // ordersReviewPage: OrdersReviewPage;
    // cartPage: CartPage;

    constructor(page: any) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        // this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        // this.ordersReviewPage = new OrdersReviewPage(this.page);
        // this.cartPage = new CartPage(this.page);


    }

    getLoginPage() {
        return this.loginPage;
    }

    // getCartPage() {
    //     return this.cartPage;
    // }

    getDashboardPage() {
        return this.dashboardPage;
    }
    // getOrdersHistoryPage() {
    //     return this.ordersHistoryPage;
    // }

    // getOrdersReviewPage() {
    //     return this.ordersReviewPage;
    // }
}
