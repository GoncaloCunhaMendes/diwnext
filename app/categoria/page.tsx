'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { Categoria } from '@/models/interface'

const API_BASE = 'https://deisishop.pythonanywhere.com'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Erro ao carregar categorias')
  return res.json()
}

export default function CategoriasPage() {
  const { data: categorias, error, isLoading } = useSWR<Categoria[]>(`${API_BASE}/categories`, fetcher)

  if (error) return <div>Erro ao carregar categorias</div>
  if (isLoading) return <div>A carregar categorias...</div>
  if (!categorias || categorias.length === 0) return <div>Sem categorias disponíveis</div>

  // Função para normalizar o nome da categoria para a URL
  const normalizeCategory = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-')
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categorias</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categorias.map((categoria, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <Link href={`/categoria/${normalizeCategory(categoria.name)}`}>
              <h2 className="text-xl font-semibold">{categoria.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
