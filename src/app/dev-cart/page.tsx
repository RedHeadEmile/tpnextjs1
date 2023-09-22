"use client";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {Button, ProductCardLayout, ProductCartLine, SectionContainer} from "tp-kit/components";
import {ProductData} from "tp-kit/types";
import {addLine, useCart} from "@/hooks/use-cart";

const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
    const onDelete = (product: ProductData) => {

    };

    const onQtyChange = (product: ProductData, qty: number) => {

    };

    const lines = useCart(state => state.lines);

    return (<>
            <pre>{JSON.stringify(lines, null, 2)}</pre>
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
                        button={<Button onClick={() => addLine(product)} variant={"ghost"} fullWidth>Ajouter au panier</Button>}
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
                <div className={"flex flex-col p-4 gap-7"}>
                    <span className={"font-bold"}>MON PANIER</span>
                    { products.map((product, index) => <ProductCartLine key={index} product={product} onDelete={() => onDelete(product)} onQtyChange={qty => onQtyChange(product, qty)} qty={2} />) }
                    <div className={"flex justify-between font-bold"}>
                        <span>Total</span>
                        <span>19.51 €</span>
                    </div>
                    <Button>Commander</Button>
                </div>
            </div>
        </SectionContainer></>
    );
}