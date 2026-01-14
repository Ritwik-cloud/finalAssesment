'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { decrementItem, incrementItem, toggleItem } from "@/redux/Slices/grocerySlice";
import { useAppSelector } from "@/redux/store/store";
import { Filter, Minus, Plus, Search, ShoppingCart, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

const Items = [
  { id: 1, name: "Apple", price: 20, category: "Fruits", quantity: 1 },
  { id: 2, name: "Milk", price: 30, category: "Dairy", quantity: 1 },
  { id: 3, name: "Rice", price: 60, category: "Grains", quantity: 1 },
  { id: 4, name: "Banana", price: 10, category: "Fruits", quantity: 1 },
  { id: 5, name: "Cheese", price: 80, category: "Dairy", quantity: 1 },
  { id: 6, name: "Bread", price: 25, category: "Grains", quantity: 1 },
  { id: 7, name: "Orange", price: 15, category: "Fruits", quantity: 1 },
  { id: 8, name: "Yogurt", price: 35, category: "Dairy", quantity: 1 },
];

export default function Home() {
  const dispatch = useDispatch();
  const { items } = useAppSelector((state) => state.Grocery);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState('none');

  const filteredItems = useMemo(() => {
    let data = [...Items];
    if (search) {
      data = data.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== "all") {
      data = data.filter(i => i.category === category);
    }
    if (sort === "high") data.sort((a, b) => b.price - a.price);
    if (sort === "low") data.sort((a, b) => a.price - b.price);
    return data;
  }, [search, sort, category]);

  const totalItemsInCart = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);

  const getItemInCart = (itemId: number) => {
    return items.find((i: any) => i.id === itemId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br bg-slate-500 p-2 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                GroceryMart
              </h1>
            </div>
            <Link href="/cart">
              <Button variant="outline" className="relative cursor-pointer">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {totalItemsInCart > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-destructive">
                    {totalItemsInCart}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 border-0 shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search groceries..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Default</SelectItem>
                  <SelectItem value="low">Price: Low to High</SelectItem>
                  <SelectItem value="high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const cartItem = getItemInCart(item.id);
            const isInCart = !!cartItem;

            return (
              <Card 
                key={item.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden h-full"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pb-8">
                  <div className="space-y-3">
                    <CardTitle className="text-lg leading-tight line-clamp-2">{item.name}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-primary">
                      ₹{item.price}
                    </CardDescription>
                  </div>

                  {!isInCart ? (
                    <Button
                      onClick={() => dispatch(toggleItem(item))}
                      className="w-full mt-6"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="mt-6 space-y-2">
                     
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => dispatch(toggleItem(item))}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 col-span-full">
            <p className="text-muted-foreground text-lg">
              No items found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
