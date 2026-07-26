"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ShoppingBag, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getCart, getCartTotal } from "./service/cart";
import { CartItem } from "./type/cart";
import CartItemCard from "./components/CartItem";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  async function loadCart() {
    const products = await getCart();
    const totalData = await getCartTotal();

    setItems(products);
    setTotal(totalData.total);
  }

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 relative top-[6vh]">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Shopping Cart
        </h1>

        <p className="mt-2 text-muted-foreground">
          {items.length} item{items.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      {items.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />

            <h2 className="text-2xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-center text-muted-foreground">
              Looks like you haven't added anything yet.
            </p>

            <Button  className="mt-6 rounded-xl">
              <Link href="/">
                Continue Shopping
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-6 lg:col-span-2">
            {items.map((item) => (
              <CartItemCard
                key={item.cart_item_id}
                item={item}
                refresh={loadCart}
              />
            ))}
          </div>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-6 h-fit">
            <Card className="rounded-3xl shadow-lg">
              <CardContent className="space-y-6 p-6">
                <h2 className="text-2xl font-bold">
                  Order Summary
                </h2>

                <div className="flex justify-between text-muted-foreground">
                  <span>Items</span>
                  <span>{items.length}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>BDT{total.toFixed(2)}</span>
                </div>

                <Button
                  
                  size="lg"
                  className="w-full rounded-xl"
                >
                  <Link href="/checkout"
                  className="flex">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  
                  variant="outline"
                  size="lg"
                  className="w-full rounded-xl"
                >
                  <Link href="/">
                    Continue Shopping
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}