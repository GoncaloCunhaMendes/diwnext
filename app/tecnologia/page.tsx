import React from 'react'
import TecnologiaDetailsCard from '@/components/TecnologiaDetailsCard/TecnologiaDetailsCard'
import tecnologias from '@/app/data/tecnologias.json';
import Link from 'next/link'
interface TecnologiaProps{
  indice: number;
}

export default function TecnologiaPage() {
  const tecnologia = tecnologias[1]
  return (
    <div>
      <p>
        <TecnologiaDetailsCard
        description = {tecnologia.description}
        title={tecnologia.title}
        />
      </p>
      <Link href="/tecnologias">
        <button style={{ padding: "10px 20px", background: "blue", color: "white", borderRadius: "8px" }}>
          Voltar
        </button>
      </Link>
    </div>
  )
}
