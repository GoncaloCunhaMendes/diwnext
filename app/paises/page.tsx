'use client'
import paises from '@/app/data/paises.json'
import { Paises } from '@/models/interface'
import Pais from '@/components/Pais/Pais'
import { useEffect, useState } from 'react'
export default function Page() {
    const listaPaises: Paises[] = paises

    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState<Paises[]>([]);
    const [sortOption, setSortOption] = useState("escolha");



    useEffect(() => {

        let filtered = listaPaises.filter((pais) =>
            pais.name.common.toLowerCase().includes(search.toLowerCase())

        );


        if (sortOption.includes('ordena')) {
            filtered = filtered.sort((a, b) =>
                parseFloat(`${a.population}`) - parseFloat(`${b.population}`)
            );

            
        }
        setFilteredData(filtered);
    }, [search, sortOption]);
    return (
        <div>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="pesquisar nome de pais"
                    style={{ padding: '8px', fontSize: '16px' }}
                />
            </div>

            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    style={{ padding: '8px', fontSize: '16px' }}
                >
                    <option value="default">default</option>
                    <option value="ordena">Ordenar por população</option>
                    

                </select>
            </div>

            <h1>Lista de Países</h1>

            {filteredData.map((pais) => (
                <div>
                    <Pais
                        name={pais.name}
                        population={pais.population}
                        area={pais.area}
                    />
                </div>
            ))}
        </div>
    )
}
