import React from 'react'
interface caracteristicaProps {
    caracteristica:Array<String>;
}

export default function caracteristica({caracteristica}:caracteristicaProps) {
  return (
    <div>
         <ul>
        {caracteristica.map((caracteristica, i) => {
          return <li key={i}>{caracteristica}</li>
        })}

      </ul>
    </div>
  )
}
