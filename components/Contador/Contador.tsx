'use client'
import React, { useState } from "react";

export default function Contador() {

  const [valor, setValor] = useState(0);
  const [historico, setHistorico] = useState<number[]>([]);

  function mudarValor(novo: number) {
    if (novo < 0 || novo > 10) return;

    setValor(novo);
    setHistorico([...historico, novo]);
  }

  let cor = "";
  if (valor <= 3) cor = "text-red-600";
  else if (valor <= 7) cor = "text-yellow-500";
  else cor = "text-green-600";

  return (
    <div>
      <h1 className={`text-4xl font-bold ${cor}`}>
        Contador: {valor}
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => mudarValor(valor + 1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl"
        >
          Aumentar
        </button>

        <button
          onClick={() => mudarValor(valor - 1)}
          className="px-6 py-3 bg-red-600 text-white rounded-xl"
        >
          Diminuir
        </button>
      </div>

      <button
        onClick={() => mudarValor(0)}
        className="mt-4 px-6 py-3 bg-gray-700 text-white rounded-xl"
      >
        Reset
      </button>

      <h2 className="text-2xl font-semibold mt-6">Histórico:</h2>
      <ul className="list-disc list-inside">
        {historico.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
