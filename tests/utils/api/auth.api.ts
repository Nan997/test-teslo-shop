import { APIRequestContext } from "@playwright/test";
import { AuthCredentials } from "../../interfaces/Auth";

export class AuthApi {

    apiContext: APIRequestContext;
    authCredentials: AuthCredentials;

    constructor(apiContext: APIRequestContext, authCredentials: AuthCredentials) {
        this.apiContext = apiContext;
        this.authCredentials = authCredentials;
    }

    async getToken() {

        const resp = await this.apiContext.post(`${process.env.URL_BACKEND}/api/auth/login`, {
            data: this.authCredentials
        })
        const respJson = await resp.json();
        const token = respJson.token;
        return token;
    }
}
