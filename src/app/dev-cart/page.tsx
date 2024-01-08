"use client";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {Button, ProductCardLayout, SectionContainer} from "tp-kit/components";
import {Cart} from "@/components/cart";
import CartCounter from "@/components/cart-counter";
import AddToCartButton from "@/components/add-to-cart-button";

const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
    console.log("rendu page");

    return (
        <SectionContainer
            className="py-36"
            wrapperClassName="flex flex-col lg:flex-row gap-24"
        >
            {/* Produits */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                {products.map((product) => (
                    <ProductCardLayout
                        key={product.id}
                        product={product}
                        button={<AddToCartButton product={product} />}
                    />
                ))}
            </section>
            {/* /Produits */}

            {/* Panier */}
            <section className="w-full lg:w-1/3 space-y-8">

                <Button variant={"outline"} fullWidth>Vider le panier</Button>
            </section>
            {/* /Panier */}

            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white flex justify-center items-center">
                <CartCounter />
                <Cart />
            </div>
        </SectionContainer>
    );
}