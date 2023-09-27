"use server";

import {CartLine} from "tp-kit/types";
import prisma from "@/utils/prisma";
import {computeLineSubTotal} from "@/hooks/use-cart";

export default async function submit(lines: CartLine[]) {
    let total = 0;
    if (lines.length > 0)
        total = lines.map(computeLineSubTotal).reduce((a, b) => a + b);

    const order = await prisma.order.create({
        data: {
            createdAt: new Date(),
            total: total
        }
    })

    await prisma.orderLine.createMany({
        data: lines.map(l => {
            return {
                orderId: order.id,
                productId: l.product.id,
                qty: l.qty,
                subtotal: computeLineSubTotal(l)
            }
        })
    });
}