import React from 'react'
import Link from 'next/link'
import Projeto from '@/components/Projeto/projeto'
export default function DescricaoProjetos() {
  return (
    <div>
      <Link href="https://goncalocunhamendes.github.io" target='_blacnk' className='text-red-700'>Clica aqui para ires para o meu site clica aqui</Link>
    <ul>
      <li>
        <Projeto 
        nome="Projeto da Loja com Filtros" 
        url="https://goncalocunhamendes.github.io/lab7/index.html"
      />
      </li>
     
      <li>Projeto de 4 em linha com balões</li>
      <li>Projeto de um site para uma loja com opões de filtragem</li>
      <li>Mini projetos para a aprendizagem de js na disciplina de DIW</li>
    </ul>
    </div>
  )
}
