'use server';

import { fetchApiClient } from '@/lib/oneentry';
import { IProduct } from '@/types/product';

interface SearchParams {
    query: string;
}

export const searchProductsAction = async ({ query }: SearchParams) => {
    try {
        const apiClient = await fetchApiClient();

        const products = await apiClient?.Products.getProducts();
        // Filter products based on the search query
        const filteredProducts = products?.items.filter((product:IProduct) =>
            product.attributeValues.p_title.value.toLowerCase().includes(query.toLowerCase()) ||
            product.attributeValues.p_description.value.some(
                (desc) => desc.htmlValue.toLowerCase().includes(query.toLowerCase())
            )   
        );
        return filteredProducts || []; // Return product items or empty array
    } catch (error) {
        console.error('Error searching products:', error);

        throw new Error(
            `Product search failed: ${error instanceof Error ? error.message : 'Unknown error'
            }`
        );
    }
};