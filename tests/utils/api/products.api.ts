import { ProductsResponse } from '../../interfaces/Products';
import { APIRequestContext } from '@playwright/test';

type Gender = 'men' | 'women' | 'kid';

export class ProductApi {

    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async getProducts(
        limit?: number,
        offset?: number,
        gender?: Gender
    ): Promise<ProductsResponse> {

        const params = new URLSearchParams();

        if (limit !== undefined) {
            params.append('limit', String(limit));
        }

        if (offset !== undefined) {
            params.append('offset', String(offset));
        }

        if (gender) {
            params.append('gender', gender);
        }

        const query = params.toString();
        const url = query
            ? `${process.env.URL_BACKEND}/api/products?${query}`
            : `${process.env.URL_BACKEND}/api/products`;

        const resp = await this.apiContext.get(url);

        if (!resp.ok()) {
            const errorBody = await resp.json();

            console.error('Error en la petición:', {
                status: resp.status(),
                url,
                errorBody
            });

            throw new Error(
                `API Error ${resp.status()}: ${JSON.stringify(errorBody)}`
            );
        }

        return (await resp.json()) as ProductsResponse;
    }
}
