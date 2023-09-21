"use client";

import {MenuBar} from "tp-kit/components";
import {useState} from "react";
import { Popover } from '@headlessui/react'

export function Menu() {
    const [opened, setOpened] = useState(false);

    const toggleCart = () => {
        setOpened(!opened);
    };

    return <MenuBar trailing={
        <div className={"relative flex justify-end align-middle"}>
            <Popover className="relative">
                <Popover.Button>Solutions</Popover.Button>

                <Popover.Panel className="absolute z-10">
                    <div className="grid grid-cols-2">
                        <a href="/analytics">Analytics</a>
                        <a href="/engagement">Engagement</a>
                        <a href="/security">Security</a>
                        <a href="/integrations">Integrations</a>
                    </div>

                    <img src="/solutions.jpg" alt="" />
                </Popover.Panel>
            </Popover>
        </div>
        } />
}