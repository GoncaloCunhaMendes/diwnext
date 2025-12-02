'use client'
import React, { useState } from 'react'

export default function Page() {

  const [texto, setTexto] = useState("")
  const [tecnologia, setTecnologia] = useState("")


  const [tarefas, setTarefas] = useState<string[]>([])
  const [novaTarefa, setNovaTarefa] = useState("")
  const [editIndex, setEditIndex] = useState<number | null>(null)

  function adicionarTarefa() {
    if (!novaTarefa.trim()) return;

    if (editIndex !== null) {
      const copia = [...tarefas]
      copia[editIndex] = novaTarefa
      setTarefas(copia)
      setEditIndex(null)
    } else {
      setTarefas([...tarefas, novaTarefa])
    }

    setNovaTarefa("")
  }

  function editarTarefa(index: number) {
    setNovaTarefa(tarefas[index])
    setEditIndex(index)
  }

  function apagarTarefa(index: number) {
    setTarefas(tarefas.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h2>Input</h2>
      <input
        type="text"
        placeholder="Escreva algo..."
        value={texto}
        onChange={(e) => setTexto(e.target.value) }
      />

      <p>Texto digitado: {texto}</p>

      <h2>Tecnologias</h2>

      <select
        value={tecnologia}
        onChange={(e) => setTecnologia(e.target.value)}
      >
        <option value="">Selecione...</option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Next.js">Next.js</option>
      </select>

      <p>Tecnologia escolhida: {tecnologia}</p>

      <h2>Lista de Tarefas</h2>

      <input
        type="text"
        placeholder="Nova tarefa..."
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
      />

      <button onClick={adicionarTarefa}>
        {editIndex !== null ? "Guardar" : "Adicionar"}
      </button>

      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            {tarefa}

            <button onClick={() => editarTarefa(index)}>
              Editar
            </button>

            <button onClick={() => apagarTarefa(index)}>
              Apagar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
