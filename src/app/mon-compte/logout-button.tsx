"use client";

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {Button} from "tp-kit/components";

export default function LogoutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const logOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  }

  return <Button variant={"outline"} onClick={logOut}>Se déconnecter</Button>;
}
