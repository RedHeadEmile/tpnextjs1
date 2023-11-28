import {SupabaseClient, UserMetadata} from "@supabase/supabase-js";

export type User = {
  id: string
  name: string | undefined;
  email: string | undefined;
}

export async function getUser(supabase: SupabaseClient): Promise<User | undefined> {
  const session = (await supabase.auth.getSession()).data.session;
  if (!session)
    return undefined;

  return {
    id: session.user.id,
    email: session.user.email,
    name: (session.user.user_metadata as UserMetadata)?.name
  };
}
