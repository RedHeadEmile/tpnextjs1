import {Button, ProductCartLine} from "tp-kit/components";
import {computeCartTotal, removeLine, updateLine, useCart} from "@/hooks/use-cart";
import CartCounter from "@/components/cart-counter";

export function Cart() {
    const lines = useCart(state => state.lines);
    return <>
        <CartCounter />
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
    </>;
}