"use client"

import {OrderTableRowData} from "tp-kit/types";
import {OrderTableLayout} from "tp-kit/components";
import {useRouter} from "next/navigation";

export default function OrderTable({ orders }: { orders: OrderTableRowData[] }) {
    const router = useRouter();

    const onRowClick = (row: OrderTableRowData) => {
        router.push('/mon-compte/commandes/' + row.id);
    }

    return <>
        <OrderTableLayout orders={orders} onRowClick={onRowClick} />
    </>
}