"use client";

import {PasswordInput, TextInput} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {z} from "zod";
import {Button, useZodI18n} from "tp-kit/components";
import Link from "next/link";

const schema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(6)
});

export default function LoginFormComponent() {
  useZodI18n(z);
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: zodResolver(schema)
  });

  const onLogin = (values: { email: string, password: string }) => {
    console.log(values);
  };

  return <div className={"bg-white shadow flex flex-col m-5 p-4 gap-5 min-w-[25rem]"}>
    <h1 className={"uppercase"}>Connexion</h1>
    <form onSubmit={form.onSubmit(onLogin)} className={"flex flex-col gap-3"}>
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

      <Button type={"submit"}>Se connecter</Button>
      <Link href={"/inscription"} className={"flex flex-col"}><Button className={"text-green"} variant={"ghost"}>Créer un compte</Button></Link>
    </form>
  </div>
}