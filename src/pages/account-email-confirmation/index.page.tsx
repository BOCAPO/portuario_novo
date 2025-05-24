import { Button } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import Header from "~components/Layout/Header/Header";

import scss from "./AccountEmailConfirmation.module.scss";

export default function AccountEmailConfirmation() {
  return (
    <>
      <Head>
        <title>Econext</title>
      </Head>
      <Header />

      <div className={scss.messageContainer}>
        <h3>Conta criada com sucesso!</h3>
        <p>Enviamos uma mensagem de confirmação para o seu email cadastrado.</p>
        <p>Por favor, antes de logar, verifique seu email clicando no link que enviamos.</p>

        <Button variant="contained" className={scss.button}>
          <Link href={'/'}>Voltar para página principal</Link>
        </Button>
      </div>
    </>
  );
}
