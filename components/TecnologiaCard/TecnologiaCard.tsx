import React from 'react'
import Image from 'next/image';
import Link from 'next/link'
import ContadorPersonalizado from '../contadorPersonalizado/contadorPersonalizado';

type TecnologiaCardProps = {
    title: string;
    image: string;
    id: number;
};

export default function TecnologiaCard({ title, image }: TecnologiaCardProps) {
    return (
        <div className="w-48 h-64 bg-blue-700 shadow-lg rounded-2xl flex flex-col items-center justify-between p-4 m-2">

            <p>{title}</p>

            <Image
                src={"/tecnologias/" + image}
                alt={title}
                width={100}
                height={100}
            />
            
            <ContadorPersonalizado title={title} />

            <Link href="/tecnologia">
                Clica aqui para veres com mais detalhes
            </Link>

        </div>
    )
}
