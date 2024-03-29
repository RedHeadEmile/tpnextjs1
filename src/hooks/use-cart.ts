import {create} from "zustand";
import {CartData, ProductLineData} from "@/types";
import {ProductData} from "tp-kit/types";
import {wait} from "tp-kit/utils/wait";

export const useCart = create<CartData>(() => ({ lines: [], count: 0 }));

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 *
 * @param product
 */
export async function addLine(product: ProductData): Promise<void> {
    await wait(1000);
    useCart.setState((state: CartData) => {
        const existingLine = state.lines.find(line => line.product.id === product.id);
        if (!existingLine)
            state.lines.push({ product: product, qty: 1 })
        else
            existingLine.qty++;
        return {...state, lines: [...state.lines], count: state.lines.length };
    })
}

/**
 * Modifie une ligne produit du panier
 *
 * @param line
 */
export function updateLine(line: ProductLineData) {
    useCart.setState((state: CartData) => {
        const existingLine = state.lines.find(line1 => line1.product.id === line.product.id);
        if (existingLine !== undefined)
            existingLine.qty = line.qty;
        else {
            state.lines.push(line);
            state.count = state.lines.length;
        }
        return {...state, lines: [...state.lines] };
    });
}

/**
 * Supprime la ligne produit du panier
 *
 * @param productId
 * @returns
 */
export function removeLine(productId: number) {
    useCart.setState((state: CartData) => {
        state.lines = state.lines.filter(line => line.product.id !== productId);
        return {...state, lines: [...state.lines], count: state.lines.length };
    });
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
    useCart.setState((state: CartData) => {
        return {...state, lines: [], count: 0 };
    });
}

/**
 * Calcule le total d'une ligne du panier
 */
export function computeLineSubTotal(line: ProductLineData): number {
    return line.qty * line.product.price;
}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {
    if (lines.length === 0) return 0;
    return lines.map(computeLineSubTotal).reduce((a, b) => a + b);
}