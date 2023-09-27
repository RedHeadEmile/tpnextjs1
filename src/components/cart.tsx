import {Button, ProductCartLine} from "tp-kit/components";
import {clearCart, computeCartTotal, removeLine, updateLine, useCart} from "@/hooks/use-cart";
import submit from "@/actions/create-orders";

export function Cart() {
    const lines = useCart(state => state.lines);

    const placeOrder = async() => {
        await submit(lines)
        clearCart();
    };

    return <>
        <div className={"flex flex-col p-4 gap-7 w-full"}>
            <span className={"font-bold"}>MON PANIER</span>
            <div className={"flex flex-col gap-7 flex-1 overflow-auto"}>
                { lines.map((line, index) =>
                    <ProductCartLine
                        key={index}
                        product={line.product}
                        onDelete={() => removeLine(line.product.id)}
                        onQtyChange={qty => updateLine({...line, qty: qty })}
                        qty={line.qty} />)
                }
            </div>
            <div className={"flex justify-between font-bold"}>
                <span>Total</span>
                <span>{ computeCartTotal(lines).toFixed(2).replace('.', ',') } €</span>
            </div>
            <Button onClick={placeOrder}>Commander</Button>
        </div>
    </>;
}