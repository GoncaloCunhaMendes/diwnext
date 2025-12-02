import React from 'react'
import ContadorPersonalizado from '../contadorPersonalizado/contadorPersonalizado';

interface TecnologiaDetailsCardProps {
    description: string;
    title: string;
}

export default function TecnologiaDetailsCard({ description, title }: TecnologiaDetailsCardProps) {
    return (
        <div>
            <p>{description}</p>

            <ContadorPersonalizado title={title} />
        </div>
    )
}
