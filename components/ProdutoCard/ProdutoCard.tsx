'use client'

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Produto } from '@/models/interface';
import { useRouter } from 'next/navigation';

export default function ProdutoCard({ id, title, price, description, category, image, rating }: Produto) {

    const router = useRouter()

    const handleNavigation = () => {
        router.push('/produtos/' + id)
    }

    return (
        <article className='p-5'>
            <h3>{title}</h3>
            <p>Preço: {price} €</p>
            <Image
                src={"https://deisishop.pythonanywhere.com" + image}
                alt={image}
                width={250}
                height={250}
            />
            <button
                onClick={handleNavigation}
                className="bg-blue-500 p-3 rounded-xl text-white font-semibold text-lg transition-transform transform hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            >Info</button>
        </article>
    )
}