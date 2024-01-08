"use client";

import {Dialog} from '@headlessui/react'
import {OrderData} from "tp-kit/types";
import RealTimeOrderDetail from "@/components/realtime-order-detail";
import {useRouter} from "next/navigation";

export default function OrderDialog({ order }: { order: OrderData }) {
    const router = useRouter();

    return <>
        <Dialog as="div" className="relative z-50" open={true} onClose={() => { console.log('closed'); router.refresh();}}>
            <Dialog.Panel className="top-0 left-0 right-0 bottom-0 fixed flex justify-center items-center">
                <div className={"bg-white rounded p-4"}><RealTimeOrderDetail order={order} /></div>
            </Dialog.Panel>
        </Dialog>
    </>
}