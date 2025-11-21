import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';
import Image from 'next/image'

export default function page() {
  return (
    <div>
        <h2>Tecnologias Exploradas</h2>
        <ul>
            {tecnologias.map((tecnologia, i) => {
                return <li key={i} style={{ backgroundColor: 'darkblue' }}>
                    {tecnologia.title} - {tecnologia.description} :  {tecnologia.rating}
                    <Image
                    src={"/tecnologias/" + tecnologia.image}
                    alt="Logotipo do react"
                    width={200}
                    height={200}
                    />
                    
                </li> 
            })}
        </ul>
    </div>
  )
}