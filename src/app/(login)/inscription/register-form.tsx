"use client";

import {PasswordInput, TextInput} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {z} from "zod";
import {Button, NoticeMessage, useZodI18n} from "tp-kit/components";
import Link from "next/link";
import {FormEvent, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(6)
});

type RegistrationData = z.infer<typeof schema>;

export default function RegisterFormComponent() {
  const supabase = createClientComponentClient();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEmailAlreadyInUse, setShowEmailAlreadyInUse] = useState(false);

  useZodI18n(z);
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },

    validate: zodResolver(schema)
  });

  const onRegister = async (values: RegistrationData, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowSuccess(false);
    setShowEmailAlreadyInUse(false);

    try {
      console.log(`${window.location.origin}/api/auth/callback`);
      const authResponse = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
          data: {
            name: values.name
          }
        },
      });
      if (!authResponse.error)
          setShowSuccess(true);
      else
          setShowEmailAlreadyInUse(true);
    }
    catch {
      alert('Une erreur est survenue lors de l\'appel au serveur.');
    }
  };

  return <div className={"bg-white shadow flex flex-col m-5 p-4 gap-5 max-w-[27rem] w-[100%]"}>
    <h1 className={"uppercase"}>Inscription</h1>
    { showSuccess && <NoticeMessage message={<span>Votre inscription a bien été prise en compte.<br/>Validez votre adresse email pour vous connecter.</span>}
                   type={"success"} /> }
    { showEmailAlreadyInUse && <NoticeMessage message={"Cette adresse email n'est pas disponible"}
                   type={"error"} /> }
    <form onSubmit={form.onSubmit(onRegister)} className={"flex flex-col gap-3"}>
      <TextInput
          withAsterisk
          label={"Nom"}
          description={"Le nom qui sera utilisé pour vos commandes"}
          placeholder={"Maud Zarella"}
          {...form.getInputProps('name')} />

      <TextInput
          withAsterisk
          label={"Adresse email"}
          placeholder={"lin.guini@barilla.it..."}
          {...form.getInputProps('email')} />

      <PasswordInput
          withAsterisk
          label={"Mot de passe"}
          placeholder={"Ke$$a1234"}
          {...form.getInputProps('password')}
      />

      <Button type={"submit"}>S&apos;inscrire</Button>
      <Link href={"/connexion"} className={"flex flex-col"}><Button className={"text-green"} variant={"ghost"}>Déjà un compte ? Se connecter</Button></Link>
    </form>
  </div>
}