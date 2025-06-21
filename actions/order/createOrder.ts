
'use server';

import { fetchApiClient } from '@/lib/oneentry';

import { cookies } from 'next/headers';

import { IOrderData } from 'oneentry/dist/orders/ordersInterfaces';

export default async function createOrder(
    orderData: IOrderData
): Promise<string> {
    const apiClient = await fetchApiClient();

    if (!apiClient) {
        throw new Error('Unable to retrieve API instance.');
    }

    const accessToken = (await cookies()).get('access_token')?.value;

    if (!accessToken) {
        throw new Error('Missing access token.');
    }

    try {
        const orderData2: IOrderData = {
            formIdentifier: "order_form",
            paymentAccountIdentifier: "stripe_payment",
            formData: { marker: "email", value: "ahmed7@gmail.com", type: "string" },
            products: [
                {
                    productId: 1,
                    quantity: 2,
                    // any other required fields in IOrderProductData
                }
            ]
        };
          
        // Create a new order using the provided order data
console.log(orderData)
        const createdOrder = await apiClient.Orders.setAccessToken(
            accessToken
        ).createOrder('orders', orderData2);
console.log('Created Order:', createdOrder);
        if (!createdOrder?.id) {
            throw new Error('Order creation was unsuccessful.');
        }

        // Create a payment session based on the newly created order

        const paymentSession = await apiClient.Payments.setAccessToken(
            accessToken
        ).createSession(createdOrder.id, 'session');
        if (!paymentSession?.paymentUrl) {
            throw new Error('Failed to generate payment session URL.');
        }

        // Return the payment URL for user redirection

        return paymentSession.paymentUrl;
    } catch (err) {
        console.error('Error during order and payment processing:', err);

        throw new Error(
            `Order or payment session creation failed. `
        );
    }
}
