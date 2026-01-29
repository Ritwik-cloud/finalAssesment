"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  decrementItem,
  incrementItem,
  toggleItem,
} from "@/redux/Slices/grocerySlice";
import { useAppSelector } from "@/redux/store/store";
import { Filter, Minus, Plus, Search, ShoppingCart, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/themeToggle";

const Items = [
  {
    id: 1,
    name: "Spencer's Wholemeal Brown Bread",
    price: 20,
    category: "Breads",
    quantity: 1,
    image:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/f0b62a0a-6ea2-4086-a007-0b41c6ba8b23.png",
  },
  {
    id: 2,
    name: "Amul Taaza Toned Milk",
    price: 30,
    category: "Dairy",
    quantity: 1,
    image:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/852a402a-54ac-41d5-9263-187f4b077171.png",
  },
  {
    id: 3,
    name: "OVO Farm On Day White Eggs",
    price: 60,
    category: "Breads",
    quantity: 1,
    image:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/092b849f-b20d-4aac-9332-223c2c0f73d0.png",
  },
  {
    id: 4,
    name: "OVO Farm On Day White Eggs",
    price: 10,
    category: "Eggs",
    quantity: 1,
    image:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/fc87a60b-b746-4cb8-912d-e51546a1874d.png",
  },
  {
    id: 5,
    name: "Amul Cheese Cubes",
    price: 80,
    category: "Dairy",
    quantity: 1,
    image:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/52377f0e-2ee1-4d3f-a0d6-f34934b71f0f.png",
  },
  {
    id: 6,
    name: "Amul Cow milk",
    price: 25,
    category: "Dairy",
    quantity: 1,
    image:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/5799b89d-2123-4746-b6e7-916722c37aec.png",
  },
  {
    id: 7,
    name: "Amul Shakti Fresh Milk",
    price: 15,
    category: "Dairy",
    quantity: 1,
    image:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/6a8390a6-3b75-4758-a261-908347b9af0f.png",
  },
  {
    id: 8,
    name: "Epigamia Natural Greek Yogurt",
    price: 35,
    category: "Dairy",
    quantity: 1,
    image:
      "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/9a9c3854-137a-44b1-b45f-26865801c266.png",
  },
];

export default function Home() {
  const dispatch = useDispatch();
  const { items } = useAppSelector((state) => state.Grocery);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    let data = [...Items];
    if (search) {
      data = data.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (category !== "all") {
      data = data.filter((i) => i.category === category);
    }
    if (sort === "high") data.sort((a, b) => b.price - a.price);
    if (sort === "low") data.sort((a, b) => a.price - b.price);
    return data;
  }, [search, sort, category]);

  const totalItemsInCart = items.reduce(
    (sum: number, item: any) => sum + (item.quantity || 1),
    0,
  );

  const getItemInCart = (itemId: number) => {
    return items.find((i: any) => i.id === itemId);
  };

  const CardSkeleton = () => (
    <Card className="border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/80 overflow-hidden h-full flex flex-col">
      <div className="h-32 w-full p-2 bg-slate-50 dark:bg-slate-900/50">
        <Skeleton className="h-full w-full rounded-md" />
      </div>
      <CardHeader className="p-2 pb-0">
        <Skeleton className="h-4 w-12 rounded-full" />
      </CardHeader>
      <CardContent className="p-3 pt-2 flex flex-col flex-grow space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="mt-auto">
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-700/50 shadow-lg dark:shadow-slate-900/50">
        <div className="container mx-auto px-4 py-3">
          {/* Main Row: Logo, Search (Desktop), and Cart */}
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                <span className="text-yellow-500 dark:text-yellow-400">
                  Grocery
                </span>
                <span className="text-green-600 dark:text-green-500">Mart</span>
              </h1>
            </div>

            {/* Desktop Controls (Search + Filters) */}
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-3xl justify-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
                <Input
                  placeholder="Search groceries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[130px] h-9 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100">
                  <Filter className="w-3.5 h-3.5 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem
                    value="all"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    All Items
                  </SelectItem>
                  <SelectItem
                    value="Breads"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Breads
                  </SelectItem>
                  <SelectItem
                    value="Dairy"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Dairy
                  </SelectItem>
                  <SelectItem
                    value="Eggs"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Eggs
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[130px] h-9 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem
                    value="none"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Default
                  </SelectItem>
                  <SelectItem
                    value="low"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Price: Low to High
                  </SelectItem>
                  <SelectItem
                    value="high"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Price: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Theme Toggle & Cart */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <Link href="/cart">
                <Button className="relative h-9 px-3 sm:px-4 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer shadow-lg dark:shadow-green-900/50 text-white transition-all active:scale-95">
                  <ShoppingCart className="w-4 h-4 sm:mr-2" />
                  <span className="font-medium hidden sm:inline">Cart</span>
                  {totalItemsInCart > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 dark:bg-red-600 text-[10px] font-bold text-white border-2 border-white dark:border-slate-900 shadow-lg">
                      {totalItemsInCart}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Controls (Search + Filters Row) */}
          <div className="mt-3 flex flex-col gap-2 md:hidden">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
            <div className="flex gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-9 text-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem
                    value="all"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    All
                  </SelectItem>
                  <SelectItem
                    value="Fruits"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Fruits
                  </SelectItem>
                  <SelectItem
                    value="Dairy"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Dairy
                  </SelectItem>
                  <SelectItem
                    value="Grains"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Grains
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-9 text-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem
                    value="none"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Default
                  </SelectItem>
                  <SelectItem
                    value="low"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Price: Low
                  </SelectItem>
                  <SelectItem
                    value="high"
                    className="dark:text-slate-100 dark:focus:bg-slate-700"
                  >
                    Price: High
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-6">
        {loading ? (
          <Skeleton className="w-full aspect-1280/272 rounded-2xl" />
        ) : (
          <div className="relative w-full overflow-hidden rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <img
              src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2026-01/Frame-1437256605-2-2.jpg"
              alt="Fresh Fruits and Vegetables Banner"
              className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? // 1. Loading State: Show Skeletons
              Array.from({ length: 8 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : // 2. Data State: Show Filtered Items
              filteredItems.map((item) => {
                const cartItem = getItemInCart(item.id);
                const isInCart = !!cartItem;
                const quantityToShow = cartItem ? cartItem.quantity : 1;

                return (
                  <Card
                    key={item.id}
                    className="group hover:shadow-2xl dark:hover:shadow-slate-900/80 transition-all duration-300 border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden h-full flex flex-col hover:border-green-500/50"
                  >
                    <div className="relative h-32 w-full overflow-hidden bg-slate-50 dark:bg-slate-900/50 p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader className="p-2 pb-0">
                      <Badge
                        variant="secondary"
                        className="text-[10px] w-fit px-1.5 py-0"
                      >
                        {item.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-3 pt-2 flex flex-col flex-grow">
                      <div className="mb-3">
                        <CardTitle className="text-sm font-semibold line-clamp-1">
                          {item.name}
                        </CardTitle>
                        <CardDescription className="text-lg font-bold text-green-600">
                          ₹{item.price}
                        </CardDescription>
                      </div>
                      <div className="mt-auto">
                        {!isInCart ? (
                          <Button
                            onClick={() => dispatch(toggleItem(item))}
                            variant="outline"
                            className="w-20 h-8 text-xs border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                          >
                            <Plus className="w-3 h-3 mr-1" /> Add
                          </Button>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between border rounded-md h-8">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => dispatch(decrementItem(item.id))}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-bold">
                                {quantityToShow}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => dispatch(incrementItem(item.id))}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full h-7 text-[10px] text-red-600"
                              onClick={() => dispatch(toggleItem(item))}
                            >
                              <X className="w-3 h-3 mr-1" /> Remove
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
        </div>

        {/* 3. Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
