"use client";

import {MenuBar} from "tp-kit/components";
import {Fragment, useEffect, useState} from "react";
import {Popover, Transition} from '@headlessui/react'
import {ShoppingCart, User, X} from "@phosphor-icons/react";
import {Indicator} from "@mantine/core";
import {Cart} from "@/components/cart";
import CartCounter from "@/components/cart-counter";
import Link from "next/link";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {getUser} from "@/utils/supabase";

export function Menu() {
  const supabase = createClientComponentClient();
  const [isConnected, setIsConnected] = useState(false);

  supabase.auth.onAuthStateChange((event, session) =>
    setIsConnected(!!session)
  )

  useEffect(() => {
    getUser(supabase).then(user => setIsConnected(!!user))
  }, [supabase]);

  return <MenuBar trailing={
    <div className={"relative flex justify-end items-center"}>
      <Link href={ isConnected ? "/mon-compte" : "/connexion" }><User size={22}/></Link>
      { isConnected && <Popover>
        {({open}) => (
            <>
              <Popover.Button>
                <Indicator inline label={<CartCounter/>} color={"#388a6b"} size={20}>
                  <div className={"m-2"}>
                    {!open && <ShoppingCart size={22}/>}
                    {open && <X size={22}/>}
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
                  <div
                      className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white flex flex-grow">
                    <Cart/>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
        )}
      </Popover> }
    </div>
  }/>
}