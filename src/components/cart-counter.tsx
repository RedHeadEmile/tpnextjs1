import {useCart} from "@/hooks/use-cart";

export default function CartCounter() {
    console.log("rendu counter")
    const lineAmount = useCart(state => state.count);
    return <>{lineAmount}</>
}