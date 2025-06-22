"use client";

import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  CreditCard,
  LogIn,
} from "lucide-react";

import useCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import CartItem from "@/components/cart/CartItem";

export default function CartPage() {
  const {
    cartItems,
    createOrderAndCheckout,
    isLoading,
    subtotal,
    tax,
    total,
    user,
  } = useCart();
  const router = useRouter();

  return (
    <div className="min-h-screen  p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Your Cart
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-900"></div>
          </div>
        ) : (
          <>
            <div>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="p-4 sm:p-6 rounded-lg border-gray-200 border-2 shadow-lg mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Order Summary
              </h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>

                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-700 my-2"></div>

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>

                  <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {user ? (
                <Button
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold cursor-pointer"
                  disabled={!cartItems.length}
                  onClick={createOrderAndCheckout}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                </Button>
              ) : (
                <Button
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold cursor-pointer"
                  onClick={() => router.push("/auth?type=login")}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Login to Checkout
                </Button>
              )}
            </div>
          </>
        )}

        {!isLoading && cartItems.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />

            <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Your cart is empty
            </h2>

            <p className="text-gray-400 mb-6">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>

            <Button
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold cursor-pointer"
              onClick={() => router.push("/")}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
