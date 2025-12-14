'use client'

import React, { use } from 'react'
import useSWR from 'swr'
import { Produto } from '@/models/interface'
import ProdutoCard from '@/components/ProdutoCard/ProdutoCard'
import Link from 'next/link'

// Função de fetcher para obter os produtos
const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Erro: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

// Função para normalizar o nome da categoria (remover espaços e tornar minúsculo)
const normalizeCategory = (name: string) => {
  return name.trim().toLowerCase().replace(/\s+/g, '-')
}

export default function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  // Usando React.use() para resolver a Promise
  const { categoria } = use(params) // Espera até o valor de `params` ser resolvido

  const url = 'https://deisishop.pythonanywhere.com/products/'
  const { data, error, isLoading } = useSWR<Produto[]>(url, fetcher)

  if (error) {
    return <p>{error.message}</p>
  }

  if (isLoading) {
    return <p>A carregar produtos...</p>
  }

  if (!data) {
    return <p>Não há produtos disponíveis</p>
  }

  // Filtrando os produtos pela categoria
  const produtosFiltrados = data.filter(produto => {
    return normalizeCategory(produto.category) === normalizeCategory(categoria)
  })

  if (produtosFiltrados.length === 0) {
    return (
      <>
        <h2 className="text-xl font-bold p-4">Nenhum produto encontrado para a categoria: {categoria}</h2>
        <Link href="/categoria" className="bg-blue-500 rounded-2xl p-2 text-white">
          Voltar para as categorias
        </Link>
      </>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold p-4">Produtos da categoria: {categoria}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtosFiltrados.map((produto) => (
          <ProdutoCard
            key={produto.id}
            id={produto.id}
            title={produto.title}
            price={produto.price}
            description={produto.description}
            category={produto.category}
            image={produto.image}
            rating={produto.rating}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/categoria" className="bg-blue-500 rounded-2xl p-2 text-white hover:bg-blue-600">
          Voltar para as categorias
        </Link>
      </div>
    </div>
  )
}
