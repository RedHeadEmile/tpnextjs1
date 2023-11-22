"use client";

import {PasswordInput, TextInput} from "@mantine/core";
import {useForm, zodResolver} from "@mantine/form";
import {z} from "zod";
import {Button, NoticeMessage} from "tp-kit/components";
import Link from "next/link";
import {useState} from "react";

const schema = z.object({
  name: z.string().nonempty({ message: 'Le champ est requis' }),
  email: z.string().nonempty({ message: 'Le champ est requis' }).email({ message: 'Email invalide' }),
  password: z.string().nonempty({ message: 'Le champ est requis' }).min(6, { message: 'Le mot de passe est trop court' })
});

export default function RegisterFormComponent() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEmailAlreadyInUse, setShowEmailAlreadyInUse] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },

    validate: zodResolver(schema)
  });

  const onRegister = (values: { name: string, email: string, password: string }) => {
    console.log(values);
    setShowSuccess(true);
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
          placeholder={"Ke$$a..."}
          {...form.getInputProps('password')}
      />

      <Button type={"submit"}>S&apos;inscrire</Button>
      <Link href={"/connexion"} className={"flex flex-col"}><Button className={"text-green"} variant={"ghost"}>Déjà un compte ? Se connecter</Button></Link>
    </form>
  </div>
}