import {OrderTableRowData} from "tp-kit/types";
import prisma from "@/utils/prisma";
import {SectionContainer} from "tp-kit/components";
import OrderTable from "@/components/order-table";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {getUser} from "@/utils/supabase";
import {redirect} from "next/navigation";
import LogoutButton from "@/app/mon-compte/logout-button";

export default async function MonCompteLayout({ children }: { children: React.ReactNode }) {
    const supabase = createServerComponentClient({ cookies });
    const user = (await getUser(supabase));

    const orders: OrderTableRowData[] = await prisma.order.findMany({
        where: {
            userId: user?.id
        }
    });

    if (!user)
        redirect('/connexion');

    return <>
        <SectionContainer>
            <div className={"flex gap-6 items-start m-4"}>
                <div className={"p-4 bg-white shadow flex flex-col gap-4 max-w-[25rem] w-[100%]"}>
                    <span className={"uppercase"}>Mon compte</span>
                    <span>Bonjour, { user?.name }</span>
                    <span>
                        <b>Nom : </b>{ user?.name }<br/>
                        <b>Email :</b>{ user?.email }
                    </span>
                    <LogoutButton />
                </div>
                <div className={"flex-grow bg-white p-4 shadow"}>
                    <OrderTable orders={orders} />
                </div>
            </div>
        </SectionContainer>
        { children }
    </>
}
