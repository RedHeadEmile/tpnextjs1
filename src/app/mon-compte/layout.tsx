import {OrderTableRowData} from "tp-kit/types";
import prisma from "@/utils/prisma";
import {SectionContainer} from "tp-kit/components";
import OrderTable from "@/components/order-table";

export default async function MonCompteLayout({ children }: { children: React.ReactNode }) {
    const orders: OrderTableRowData[] = await prisma.order.findMany();

    return <>
        <SectionContainer>
            <div className={"bg-white m-4 p-4 shadow"}>
                <OrderTable orders={orders} />
            </div>
        </SectionContainer>
        { children }
    </>
}