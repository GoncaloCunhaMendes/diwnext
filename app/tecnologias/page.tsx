import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';
import Image from 'next/image'
import TecnologiaCard from '@/components/TecnologiaCard/TecnologiaCard';

export default function tecnologia() {
  return (
    <div>
      <h2>Tecnologias Exploradas</h2>
      {/* <ul>
        {tecnologias.map((tecnologia, i) => {
          return <li key={i} style={{ backgroundColor: 'darkblue' }}>
            {tecnologia.title} - {tecnologia.description} :  {tecnologia.rating}
            <Image
              src={"/tecnologias/" + tecnologia.image}
              alt="Logotipo do react"
              width={100}
              height={100}
            />
          </li>
        })}
      </ul> */}
      <ul>
        {tecnologias.map((tecnologia, i) => (
          <li key={i}>
            <TecnologiaCard
              title={tecnologia.title}
              image={tecnologia.image}
              id={i}
            />
            <p>{tecnologia.description}</p>

          </li>
        ))}
      </ul>
    </div>
  )
}