// components/Projeto/Projeto.tsx
import Link from "next/link";
import React from "react";

type ProjetoProps = {
  nome: string;
  url: string;
};

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
 <p>
  Projeto de {nome}, para abrir clica aqui:
  <Link href={url} target="_blank">  {"--->"} Abrir projeto</Link>
</p>
  );
}
