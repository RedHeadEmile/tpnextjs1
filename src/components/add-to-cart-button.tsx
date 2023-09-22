"use client";

import {ProductData} from "tp-kit/types";
import {Button, ButtonProps} from "tp-kit/components";
import {addLine} from "@/hooks/use-cart";
import {useState} from "react";
import {Loader} from "@mantine/core";

type Props = {
    product: ProductData
} & Omit<ButtonProps, 'onClick' | 'children'>

export default function AddToCartButton({ product, ...rest }: Props) {
    const [loading, setLoading] = useState(false);

    const addToCart = async () => {
        setLoading(true);
        await addLine(product);
        setLoading(false);
    }

    if (rest.variant === undefined)
        rest.variant = "ghost";

    return <Button {...rest} onClick={addToCart} disabled={loading}>
        {loading && <Loader className={"inline stroke-green"} size={16} />} Ajouter au panier
    </Button>
}