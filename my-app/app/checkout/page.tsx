"use client";

import { useState } from "react";
import { checkout } from "./service/checkout";
import type { CheckoutRequest } from "./type/checkout";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, CreditCard, Truck } from "lucide-react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CheckoutRequest>({
    paymentMethod: "COD",

    shipping: {
      full_name: "",
      phone: "",
      email: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "Bangladesh",
    },
  });

  const updateShipping = (
    field: keyof CheckoutRequest["shipping"],
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [field]: value,
      },
    }));
  };

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await checkout(form);

      toast.success(result.message);

      console.log(result);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-10">
      <div className="container mx-auto max-w-7xl px-4 relative top-[6vh]">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Checkout
          </h1>

          <p className="mt-2 text-muted-foreground">
            Complete your order securely.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-3"
        >
          {/* Left */}

          <Card className="lg:col-span-2 rounded-3xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Address
              </CardTitle>

              <CardDescription>
                Enter your delivery information.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>

                  <Input
                    required
                    value={form.shipping.full_name}
                    onChange={(e) =>
                      updateShipping(
                        "full_name",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>

                  <Input
                    required
                    value={form.shipping.phone}
                    onChange={(e) =>
                      updateShipping(
                        "phone",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>

                <Input
                  type="email"
                  value={form.shipping.email}
                  onChange={(e) =>
                    updateShipping(
                      "email",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Address Line 1</Label>

                <Input
                  required
                  value={form.shipping.address_line1}
                  onChange={(e) =>
                    updateShipping(
                      "address_line1",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Address Line 2</Label>

                <Input
                  value={form.shipping.address_line2}
                  onChange={(e) =>
                    updateShipping(
                      "address_line2",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>City</Label>

                  <Input
                    required
                    value={form.shipping.city}
                    onChange={(e) =>
                      updateShipping(
                        "city",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>State</Label>

                  <Input
                    value={form.shipping.state}
                    onChange={(e) =>
                      updateShipping(
                        "state",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Postal Code</Label>

                  <Input
                    required
                    value={form.shipping.postal_code}
                    onChange={(e) =>
                      updateShipping(
                        "postal_code",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Country</Label>

                  <Input
                    required
                    value={form.shipping.country}
                    onChange={(e) =>
                      updateShipping(
                        "country",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right */}

          <Card className="sticky top-6 h-fit rounded-3xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment
              </CardTitle>

              <CardDescription>
                Choose a payment method.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <RadioGroup
                value={form.paymentMethod}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    paymentMethod:
                      value as CheckoutRequest["paymentMethod"],
                  }))
                }
              >
                {[
                  "COD",
                  "CARD",
                  "BKASH",
                  "NAGAD",
                  "ROCKET",
                ].map((method) => (
                  <div
                    key={method}
                    className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-muted"
                  >
                    <Label
                      htmlFor={method}
                      className="cursor-pointer font-medium"
                    >
                      {method}
                    </Label>

                    <RadioGroupItem
                      id={method}
                      value={method}
                    />
                  </div>
                ))}
              </RadioGroup>

              <Separator />

              <div className="space-y-3 rounded-2xl bg-muted/50 p-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Shipping
                  </span>

                  <span>Calculated later</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Payment
                  </span>

                  <span>{form.paymentMethod}</span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full rounded-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </main>
  );
}