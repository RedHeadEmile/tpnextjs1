"use client";

import {MenuBar} from "tp-kit/components";
import {Fragment, useState} from "react";
import {Popover, Transition} from '@headlessui/react'
import {ShoppingCart, User, X} from "@phosphor-icons/react";
import {Indicator} from "@mantine/core";
import {stGreen} from 'tp-kit/tailwind/colors';
import {Cart} from "@/components/cart";
import CartCounter from "@/components/cart-counter";
import Link from "next/link";

export function Menu() {
    return <MenuBar trailing={
            <div className={"relative flex justify-end items-center"}>
                <Link href={"/mon-compte"}><User size={22} /></Link>
                <Popover>
                    {({ open }) => (
                        <>
                            <Popover.Button>
                                <Indicator inline label={<CartCounter />} color={stGreen.DEFAULT} size={20}>
                                    <div className={"m-2"}>
                                        { !open && <ShoppingCart size={22} /> }
                                        { open && <X size={22} /> }
                                    </div>
                                </Indicator>
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute top-full left-0 right-0 mt-6 max-h-[80vh] flex">
                                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white flex flex-grow">
                                        <Cart />
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        } />
}