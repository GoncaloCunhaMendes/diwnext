import React from 'react'
import { Paises } from '@/models/interface'


export default function Pais({ name, population, area }: Paises) {
    return (
        <div>
            <h2>{name.common}</h2>
            <p>Nome oficial: {name.official}</p>
            <p>Área: {area} km²</p>
        </div>
    )
}
