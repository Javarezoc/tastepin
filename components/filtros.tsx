"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Ambiente, Categoria, Filtros } from "@/types"
import { Search } from 'lucide-react'

interface FiltrosComponentProps {
  categorias: Categoria[]
  ambientes: Ambiente[]
  filtrosIniciais?: Filtros
}

export default function FiltrosComponent({ categorias, ambientes, filtrosIniciais }: FiltrosComponentProps) {
  const router = useRouter()
  const [busca, setBusca] = useState(filtrosIniciais?.busca || "")

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (busca) params.set("busca", busca)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <form onSubmit={handleBusca} className="flex-1 flex gap-2">
          <input
            placeholder="Buscar estabelecimentos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 p-2 border border-gray-700 bg-gray-800 text-white rounded"
          />
          <button type="submit" className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
