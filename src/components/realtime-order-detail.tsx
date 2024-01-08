"use client";

import {useEffect, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {OrderData} from "tp-kit/types";
import {OrderDetailsLayout} from "tp-kit/components";

export default function RealTimeOrderDetail({ order }: { order: OrderData }) {
  const [realTimeOrder, setRealTimeOrder] = useState(order);

  const supabase = createClientComponentClient();
  useEffect(() => {
    const channel = supabase
        .channel('schema-db-changes')
        .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'Order',
              filter: 'id=eq.' + order.id
            },
            (payload) => {
              const newValues = payload.new;
              setRealTimeOrder(old => { return {...old, ...newValues}; });
            }
        )
        .subscribe();

    return () => { channel.unsubscribe().then(r => {}); };
  }, [order.id, supabase]);

  return <OrderDetailsLayout order={realTimeOrder} />;
}