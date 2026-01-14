"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <>
      <header className=" flex justify-around items-center">
        <h3>Header</h3>

        <Link href={"/cart"}>
          <span >
      
            <ShoppingCart /> cart
          </span>
        </Link>
      </header>
    </>
  );
};
