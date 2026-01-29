"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  applyCoupon,
  decrementItem,
  incrementItem,
  toggleItem,
  undo,
} from "@/redux/Slices/grocerySlice";
import { useAppSelector } from "@/redux/store/store";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  Trash2,
  Undo2,
} from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const { items, coupon } = useAppSelector((state) => state.Grocery);
  const [couponInput, setCouponInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const Coupons: { [key: string]: number } = {
    SAVE10: 10,
    SAVE20: 20,
    SAVE30: 30,
  };

  const total = useMemo(() => {
    return items.reduce((sum: number, item: any) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);
  }, [items]);

  const thresholdDiscount = total >= 100 ? 10 : 0;
  const couponDiscount = Coupons[coupon] || 0;
  const discount = thresholdDiscount + couponDiscount;
  const final = total - (total * discount) / 100;

  const handleApplyCoupon = () => {
    const upperCoupon = couponInput.toUpperCase();
    dispatch(applyCoupon(upperCoupon));
    if (Coupons[upperCoupon]) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>

              <h1 className="text-xl font-bold tracking-tight hidden sm:block">
                <span className=" text-yellow-500"> Grocery</span>
                <span className="text-green-600">Cart</span>
              </h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Cart Items ({items.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {items.length === 0 ? (
                    <div className="text-center py-16">
                      <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                        Your cart is empty
                      </p>
                      <a href="/">
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-200 cursor-pointer">
                          Start Shopping
                        </Button>
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="w-16 h-16 bg-white rounded-md border border-gray-100 flex-shrink-0 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              ₹{item.price} each
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg p-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => dispatch(decrementItem(item.id))}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>

                            <span className="font-bold text-lg px-3 min-w-[40px] text-center">
                              {item.quantity || 1}
                            </span>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => dispatch(incrementItem(item.id))}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="text-right min-w-[80px]">
                            <p className="font-bold text-lg text-green-600 dark:text-green-400">
                              ₹{item.price * (item.quantity || 1)}
                            </p>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => dispatch(toggleItem(item))}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {items.length > 0 && (
                <Card className="mt-4 border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
                  <CardContent className="p-4">
                    <Button
                      variant="outline"
                      onClick={() => dispatch(undo())}
                      className="w-full cursor-pointer"
                    >
                      <Undo2 className="w-4 h-4 mr-2" />
                      Undo Last Action
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Coupon Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Select a coupon
                    </label>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {Object.keys(Coupons).map((code) => (
                        <button
                          key={code}
                          onClick={() => {
                            dispatch(applyCoupon(code));
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 3000);
                          }}
                          
                          disabled= {items.length === 0}
                          className={`text-xs px-2 py-1 rounded-md border transition-all cursor-pointer ${
                            coupon === code
                              ? "bg-green-600 border-green-600 text-white shadow-sm"
                              : "bg-white border-slate-200 text-slate-600 hover:border-green-500 hover:text-green-600"
                          }`}
                        >
                          <span className="font-bold">{code}</span> -{" "}
                          {Coupons[code]}% off
                        </button>
                      ))}
                    </div>
                  </div>

                  {showSuccess && coupon && (
                    <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertDescription className="text-green-700 dark:text-green-300">
                        Coupon "{coupon}" applied! You save {couponDiscount}%
                      </AlertDescription>
                    </Alert>
                  )}
                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Subtotal
                      </span>
                      <span className="font-medium">₹{total}</span>
                    </div>

                    {thresholdDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                        <span>Bulk Discount (₹100+)</span>
                        <span>-{thresholdDiscount}%</span>
                      </div>
                    )}

                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                        <span>Coupon Discount</span>
                        <span>-{couponDiscount}%</span>
                      </div>
                    )}

                    {discount > 0 && (
                      <div className="flex justify-between text-sm font-medium text-green-600 dark:text-green-400">
                        <span>Total Discount</span>
                        <span>-{discount}%</span>
                      </div>
                    )}
                  </div>

                  <Separator />
                  

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ₹{final.toFixed(2)}
                    </span>
                  </div>

                 {total < 100 && total > 0 && (
                    <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50">
                      <AlertDescription className="text-sm text-blue-700 dark:text-blue-300">
                        Add ₹{100 - total} more to get 10% bulk discount!
                      </AlertDescription>
                    </Alert>
                  )}


                  <Button
                    className="w-full text-lg py-6 text-white bg-green-700  hover:bg-green-800 hover:transition-colors duration-200 cursor-pointer "
                    disabled={items.length === 0}
                  >
                    Proceed to Checkout
                    <ArrowRight />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      );
    </>
  );
};

export default Page;
