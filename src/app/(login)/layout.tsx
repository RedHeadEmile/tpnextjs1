import {ZodI18nProvider} from "tp-kit/components";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {getUser} from "@/utils/supabase";
import {redirect} from "next/navigation";

export default async function LoginLayout( {children}: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });

  const user = await getUser(supabase);
  if (!!user)
    redirect('/');

  return <ZodI18nProvider>{children}</ZodI18nProvider>
}