import getUserData from "@/actions/auth/getUserData";
import createOrder from "@/actions/order/createOrder";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { IOrderData } from "oneentry/dist/orders/ordersInterfaces";
import { IUserEntity } from "oneentry/dist/users/usersInterfaces";
import { useEffect, useState } from "react";

const useCart = () => {
    const router = useRouter();

    const cartItems = useCartStore((state) => state.cart);

   
    const clearCart = useCartStore((state) => state.clearCart);

    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState<IUserEntity | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        async function fetchUser() {
            try {
                setIsLoading(true);

                const userData = await getUserData();
                if (userData) setUser(userData as IUserEntity);

                setIsLoading(false);
            } catch (error) {
                console.error({ error });

                setUser(null);

                setIsLoading(false);
            }
        }

        fetchUser();
    }, []);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,

        0
    );

    const tax = subtotal * 0.1; // Assuming 10% tax

    const total = subtotal + tax;

    const createOrderAndCheckout = async () => {
        const data: IOrderData = {
            formData: { marker: "email", value: user?.identifier, type: "string" },
            formIdentifier: "order_form",

            paymentAccountIdentifier: "stripe_payment",

            products: cartItems.map((item) => ({
                productId: Number(item.id),

                quantity: item.quantity,
            })),
        };

        const url = await createOrder(data);

        clearCart();

        router.push(url);
    };
    return {
        cartItems,

        subtotal,

        tax,

        total,

        isLoading,

        user,
        createOrderAndCheckout,
  }
}

export default useCart