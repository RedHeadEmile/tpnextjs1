"use client";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {Button, ProductCardLayout, ProductCartLine, SectionContainer} from "tp-kit/components";
import {addLine, computeCartTotal, removeLine, updateLine, useCart} from "@/hooks/use-cart";

const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
    const lines = useCart(state => state.lines);

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
                    { lines.map((line, index) =>
                        <ProductCartLine
                            key={index}
                            product={line.product}
                            onDelete={() => removeLine(line.product.id)}
                            onQtyChange={qty => updateLine({...line, qty: qty })}
                            qty={line.qty} />)
                    }
                    <div className={"flex justify-between font-bold"}>
                        <span>Total</span>
                        <span>{ computeCartTotal(lines).toFixed(2).replace('.', ',') } €</span>
                    </div>
                    <Button>Commander</Button>
                </div>
            </div>
        </SectionContainer>
    );
}