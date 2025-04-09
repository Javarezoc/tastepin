"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Categoria, Ambiente } from "@/types"

interface BuscaFormProps {
  categorias: Categoria[]
  ambientes: Ambiente[]
  onSearch?: (filtros: {
    busca?: string
    tipo?: string
    categoria?: string
    ambiente?: string
    bairro?: string
  }) => void
  isHomePage?: boolean
  bairros?: string[]
}

export default function BuscaForm({
  categorias,
  ambientes,
  bairros = [],
  onSearch,
  isHomePage = false,
}: BuscaFormProps) {
  const router = useRouter()
  const [busca, setBusca] = useState("")
  const [tipo, setTipo] = useState("todos")
  const [categoria, setCategoria] = useState("todas")
  const [ambiente, setAmbiente] = useState("todos")
  const [bairro, setBairro] = useState("todos")
  const [categoriasFiltradas, setCategoriasFiltradas] = useState<Categoria[]>([])

  // Atualizar categorias filtradas quando o tipo mudar
  useEffect(() => {
    if (!categorias || categorias.length === 0) {
      setCategoriasFiltradas([])
      return
    }

    if (tipo === "todos") {
      setCategoriasFiltradas(categorias)
    } else if (tipo === "comida_e_bebida") {
      setCategoriasFiltradas(categorias)
    } else {
      setCategoriasFiltradas(categorias.filter((cat) => cat.tipo === tipo))
    }

    // Resetar categoria selecionada quando mudar o tipo
    setCategoria("todas")
  }, [tipo, categorias])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const filtros = {
      busca: busca || undefined,
      tipo: tipo !== "todos" ? tipo : undefined,
      categoria: categoria !== "todas" ? categoria : undefined,
      ambiente: ambiente !== "todos" ? ambiente : undefined,
      bairro: bairro !== "todos" ? bairro : undefined,
    }

    if (isHomePage && onSearch) {
      // Se estiver na página inicial, chama a função de busca local
      onSearch(filtros)
    } else {
      // Caso contrário, redireciona para a página de estabelecimentos
      const params = new URLSearchParams()
      if (busca) params.append("busca", busca)
      if (tipo !== "todos") params.append("tipo", tipo)
      if (categoria !== "todas") params.append("categoria", categoria)
      if (ambiente !== "todos") params.append("ambiente", ambiente)
      if (bairro !== "todos") params.append("bairro", bairro)

      router.push(`/estabelecimentos?${params.toString()}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg minimal-shadow border border-gray-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <input
            type="text"
            placeholder="O que você está procurando?"
            className="w-full p-3 border border-gray-600 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div>
          <select
            className="w-full p-3 border border-gray-600 bg-[#2a2a2a] text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            aria-label="Tipo de estabelecimento"
          >
            <option value="todos">Todos os tipos</option>
            <option value="comida">Comida</option>
            <option value="bebida">Bebida</option>
            <option value="comida_e_bebida">Comida e Bebida</option>
          </select>
        </div>

        <div>
          <select
            className="w-full p-3 border border-gray-600 bg-[#2a2a2a] text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            aria-label="Categoria gastronômica"
          >
            <option value="todas">Todas as categorias</option>
            {categoriasFiltradas && categoriasFiltradas.length > 0 ? (
              categoriasFiltradas.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.nome}
                </option>
              ))
            ) : (
              <>
                <option value="japonesa">Japonesa</option>
                <option value="italiana">Italiana</option>
                <option value="brasileira">Brasileira</option>
                <option value="arabe">Árabe</option>
                <option value="cervejaria">Cervejaria</option>
                <option value="bar-drinks">Bar de Drinks</option>
                <option value="cafeteria">Cafeteria</option>
              </>
            )}
          </select>
        </div>

        <div>
          <select
            className="w-full p-3 border border-gray-600 bg-[#2a2a2a] text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            value={ambiente}
            onChange={(e) => setAmbiente(e.target.value)}
            aria-label="Ambiente"
          >
            <option value="todos">Todos os ambientes</option>
            {ambientes && ambientes.length > 0 ? (
              ambientes.map((amb) => (
                <option key={amb.id} value={amb.slug}>
                  {amb.nome}
                </option>
              ))
            ) : (
              <>
                <option value="area-externa">Área Externa</option>
                <option value="rooftop">Rooftop</option>
                <option value="pet-friendly">Pet Friendly</option>
                <option value="musica-ao-vivo">Música ao Vivo</option>
                <option value="familiar">Familiar</option>
              </>
            )}
          </select>
        </div>

        <div className="lg:col-span-5 md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <select
              className="w-full p-3 border border-gray-600 bg-[#2a2a2a] text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              aria-label="Bairro"
            >
              <option value="todos">Todos os bairros</option>
              {bairros && bairros.length > 0 ? (
                bairros.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))
              ) : (
                <>
                  <option value="pinheiros">Pinheiros</option>
                  <option value="vila-madalena">Vila Madalena</option>
                  <option value="itaim-bibi">Itaim Bibi</option>
                  <option value="jardins">Jardins</option>
                  <option value="moema">Moema</option>
                </>
              )}
            </select>
          </div>

          <div className="md:col-span-1">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-all font-medium"
            >
              BUSCAR
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
