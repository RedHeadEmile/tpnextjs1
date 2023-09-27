import {RoutePageProps} from "@/types";
import OrderDialog from "@/app/mon-compte/commandes/[orderId]/order-dialog";
import prisma from "@/utils/prisma";
import {notFound} from "next/navigation";

export default async function OrderPage({ params }: RoutePageProps<{ orderId: string }>) {
    const orderId = Number(params.orderId);
    if (isNaN(orderId) || orderId <= 0)
        notFound();

    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { lines: { include: { product: {} } } } });

    if (!order)
        notFound();

    return <>
        <OrderDialog order={order} />
    </>
}