"use client";

import {Fragment} from "react";
import {Dialog} from '@headlessui/react'
import {OrderData} from "tp-kit/types";
import {OrderDetailsLayout} from "tp-kit/components";

export default function OrderDialog({ order }: { order: OrderData }) {

    return <>
        <Dialog as="div" className="relative z-50" open={true} onClose={() => {}}>
            <Dialog.Panel className="top-0 left-0 right-0 bottom-0 fixed flex justify-center items-center">
                <div className={"bg-white rounded p-4"}><OrderDetailsLayout order={order} /></div>
            </Dialog.Panel>
        </Dialog>
    </>
}