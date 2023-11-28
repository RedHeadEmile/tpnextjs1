"use server";

import {CartLine} from "tp-kit/types";
import prisma from "@/utils/prisma";
import {computeLineSubTotal} from "@/hooks/use-cart";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {getUser} from "@/utils/supabase";

export type SubmitResponse = {
    error: string | null,
    success: boolean
};

export default async function submit(lines: CartLine[]): Promise<SubmitResponse> {
    const supabase = createServerComponentClient({ cookies });
    const user = await getUser(supabase);
    if (!user)
        return {
            error: 'Vous devez être connecté pour exécuter cette action',
            success: false
        };

    if (lines.length == 0)
        return;

    let total = lines.map(computeLineSubTotal).reduce((a, b) => a + b);
    const order = await prisma.order.create({
        data: {
            userId: user.id,
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

    return { success: true };
}