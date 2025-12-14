'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { Produto } from '@/models/interfaces';
import { useEffect, useState } from 'react';

const API_BASE = 'https://deisishop.pythonanywhere.com';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro: ${res.status} ${res.statusText}`);
  return res.json();
};

export default function ProdutoPage() {
  // A. Obter o id do produto da URL
  const params = useParams();
  const id = Number(params.id); // ID da URL

  // B. Definir o estado e obter os dados
  const [produto, setProduto] = useState<Produto | undefined>(undefined);
  const { data, error, isLoading } = useSWR<Produto[]>(`${API_BASE}/products`, fetcher);

  useEffect(() => {
    if (!data) return;
    const encontrado = data.find((p) => p.id === id);
    setProduto(encontrado);
  }, [data, id]);

  // C. Tratar casos de erro ou dados faltantes
  if (error) return <div>Erro ao carregar o produto</div>;
  if (isLoading) return <div>A carregar produto...</div>;
  if (!produto) return <div>Produto não encontrado</div>;

  return (
    <main>
      <h1>{produto.title}</h1>

      {produto.image ? (
        <Image
          src={`${API_BASE}${produto.image}`}
          alt={produto.title}
          width={400}
          height={400}
        />
      ) : (
        <div style={{ width: '400px', height: '400px', backgroundColor: '#e0e0e0' }} />
      )}

      <p>{produto.description}</p>
      <p>Preço: {produto.price} €</p>
      <p>Categoria: {produto.category}</p>
      <p>Avaliação: {produto.rating?.rate ?? '—'}</p>

      <Link href="/produtos" style={{ color: 'blue' }}>
        ← Voltar para os produtos
      </Link>
    </main>
  );
}
