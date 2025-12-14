'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { Produto } from '@/models/interface';
import Link from 'next/link';

const API_BASE = 'https://deisishop.pythonanywhere.com';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao carregar produtos');
  return res.json();
};

export default function ProdutosPage() {
  const { data: produtos, error, isLoading } = useSWR<Produto[]>(`${API_BASE}/products`, fetcher);
  const [cart, setCart] = useState<Produto[]>([]);
  const [isStudent, setIsStudent] = useState(false); // Estado para o checkbox de estudante
  const [coupon, setCoupon] = useState(""); // Estado para o cupão de desconto
  const [search, setSearch] = useState(""); // Estado para armazenar o texto de pesquisa
  const [filteredData, setFilteredData] = useState<Produto[]>(produtos || []); // Estado para armazenar os produtos filtrados
  const [sortOption, setSortOption] = useState("name-asc"); // Estado para armazenar a opção de ordenação

  // Carregar o carrinho do localStorage ao carregar a página
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  // Filtrar e ordenar os produtos sempre que o estado "search" ou "sortOption" mudar
  useEffect(() => {
    if (produtos) {
      let filtered = produtos.filter((produto) =>
        produto.title.toLowerCase().includes(search.toLowerCase()) // Filtra ignorando maiúsculas/minúsculas
      );

      // Ordenação dos produtos
      if (sortOption.includes('name')) {
        filtered = filtered.sort((a, b) =>
          sortOption === 'name-asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
      } else if (sortOption.includes('price')) {
        filtered = filtered.sort((a, b) =>
          sortOption === 'price-asc' ? parseFloat(a.price) - parseFloat(b.price) : parseFloat(b.price) - parseFloat(a.price)
        );
      }

      setFilteredData(filtered);
    }
  }, [search, sortOption, produtos]);

  // Função para adicionar um produto ao carrinho
  const addToCart = (produto: Produto) => {
    const existingProduct = cart.find((item) => item.id === produto.id);
    const updatedCart = [...cart, produto];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Salva no localStorage
  };

  // Função para remover um produto do carrinho
  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((produto) => produto.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Atualiza no localStorage
  };

  // Calcular o custo total
  const totalCost = cart.reduce((acc, produto) => acc + parseFloat(produto.price), 0).toFixed(2);

  // Função para realizar a compra
  const comprar = () => {
    fetch('https://deisishop.pythonanywhere.com/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: cart.map((product) => product.id), // Envia os ids dos produtos no carrinho
        student: isStudent, // Envia se o usuário é estudante
        coupon: coupon, // Envia o cupão de desconto
        name: 'Nome do Cliente', // Você pode adicionar um input de nome do cliente se necessário
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw err;
          });
        }
        return response.json();
      })
      .then((response) => {
        alert('Compra realizada com sucesso!');
        setCart([]); // Limpa o carrinho após a compra
        localStorage.setItem('cart', JSON.stringify([])); // Limpa o carrinho no localStorage
      })
      .catch((err) => {
        console.error('Erro ao comprar:', err);
        alert(err.message || 'Erro ao comprar');
      });
  };

  // Exibição de carregamento ou erro
  if (error) return <div>Erro ao carregar os produtos</div>;
  if (isLoading) return <div>A carregar produtos...</div>;
  if (!produtos || produtos.length === 0) return <div>Sem produtos disponíveis</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Produtos</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Link href="/categoria" style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
          Ver Categorias
        </Link>
      </div>

      {/* Campo de pesquisa */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Atualiza o estado "search"
          placeholder="Pesquisar por nome do produto"
          style={{ padding: '8px', fontSize: '16px' }}
        />
      </div>

      {/* Campo de seleção para ordenar */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)} // Atualiza a opção de ordenação
          style={{ padding: '8px', fontSize: '16px' }}
        >
          <option value="name-asc">Ordenar por Nome (A-Z)</option>
          <option value="name-desc">Ordenar por Nome (Z-A)</option>
          <option value="price-asc">Ordenar por Preço (Crescente)</option>
          <option value="price-desc">Ordenar por Preço (Decrescente)</option>
        </select>
      </div>

      {/* Exibição do carrinho */}
      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Carrinho ({cart.length} {cart.length === 1 ? 'item' : 'itens'}) - Total: {totalCost} €
        </div>
      </div>

      {/* Lista de produtos filtrados */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {filteredData.map((produto) => (
          <div
            key={produto.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
             <div style={{ marginBottom: '10px' }}>
              <Link href={`/produtos/${produto.id}`}>
                <button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px' }}>
                  Ver Detalhes
                </button>
              </Link>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{produto.title}</h3>
            <p>Preço: {produto.price} €</p>
            <Image
              src={'https://deisishop.pythonanywhere.com' + produto.image}
              alt={produto.title}
              width={250}
              height={250}
            />
            <button onClick={() => addToCart(produto)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>

      {/* Exibição do carrinho com produtos adicionados */}
      <div style={{ marginTop: '40px' }}>
        {cart.length > 0 ? (
          <>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Itens no Carrinho</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {cart.map((produto) => (
                <div
                  key={produto.id}

                >
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{produto.title}</h3>
                  <p>Preço: {produto.price} €</p>
                  <Image
                    src={'https://deisishop.pythonanywhere.com' + produto.image}
                    alt={produto.title}
                    width={250}
                    height={250}
                  />
                  <button onClick={() => removeFromCart(produto.id)}>Remover do Carrinho</button>

                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Total: {totalCost} €</h3>
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center' }}>Seu carrinho está vazio.</p>
        )}

        {/* Adicionar checkbox e campo de cupão */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <label>
            <input
              type="checkbox"
              checked={isStudent}
              onChange={(e) => setIsStudent(e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            Estudante DEISI
          </label>
          <br />
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Digite seu cupão de desconto"
          />
        </div>

        {/* Botão Comprar */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={comprar}>Comprar</button>
        </div>
      </div>
    </div>
  );
}
