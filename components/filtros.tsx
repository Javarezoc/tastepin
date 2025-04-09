"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Ambiente, Categoria, Filtros } from "@/types"
import { Filter, Search, X } from 'lucide-react'

interface FiltrosComponentProps {
  categorias: Categoria[]
  ambientes: Ambiente[]
  filtrosIniciais?: Filtros
}

export default function FiltrosComponent({ categorias, ambientes, filtrosIniciais }: FiltrosComponentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filtros, setFiltros] = useState<Filtros>({
    categorias: filtrosIniciais?.categorias || [],
    ambientes: filtrosIniciais?.ambientes || [],
    tipo: filtrosIniciais?.tipo || "todos",
    busca: filtrosIniciais?.busca || "",
  })

  const [busca, setBusca] = useState(filtrosIniciais?.busca || "")
  const [isOpen, setIsOpen] = useState(false)

  const categoriasComida = categorias.filter((c) => c.tipo === "comida")
  const categoriasBebida = categorias.filter((c) => c.tipo === "bebida")

  const aplicarFiltros = () => {
    const params = new URLSearchParams()

    if (filtros.tipo && filtros.tipo !== "todos") {
      params.set("tipo", filtros.tipo)
    }

    if (filtros.categorias && filtros.categorias.length > 0) {
      params.set("categorias", filtros.categorias.join(","))
    }

    if (filtros.ambientes && filtros.ambientes.length > 0) {
      params.set("ambientes", filtros.ambientes.join(","))
    }

    if (filtros.busca) {
      params.set("busca", filtros.busca)
    }

    router.push(`/?${params.toString()}`)
    setIsOpen(false)
  }

  const limparFiltros = () => {
    setFiltros({
      categorias: [],
      ambientes: [],
      tipo: "todos",
      busca: "",
    })
    setBusca("")
    router.push("/")
    setIsOpen(false)
  }

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault()
    setFiltros((prev) => ({ ...prev, busca }))
    aplicarFiltros()
  }

  const toggleCategoria = (slug: string) => {
    setFiltros((prev) => {
      const categorias = prev.categorias || []
      return {
        ...prev,
        categorias: categorias.includes(slug) ? categorias.filter((c) => c !== slug) : [...categorias, slug],
      }
    })
  }

  const toggleAmbiente = (slug: string) => {
    setFiltros((prev) => {
      const ambientes = prev.ambientes || []
      return {
        ...prev,
        ambientes: ambientes.includes(slug) ? ambientes.filter((a) => a !== slug) : [...ambientes, slug],
      }
    })
  }

  useEffect(() => {
    // Atualizar filtros quando os parâmetros de URL mudarem
    const tipo = (searchParams.get("tipo") as Filtros["tipo"]) || "todos"
    const categorias = searchParams.get("categorias")?.split(",") || []
    const ambientes = searchParams.get("ambientes")?.split(",") || []
    const busca = searchParams.get("busca") || ""

    setFiltros({ tipo, categorias, ambientes, busca })
    setBusca(busca)
  }, [searchParams])

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

        <button 
          onClick={() => setIsOpen(true)} 
          className="border border-gray-700 bg-gray-800 text-white p-2 rounded hover:border-orange-500"
        >
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Mostrar filtros ativos */}
      {filtros.categorias?.length || filtros.ambientes?.length || filtros.tipo !== "todos" || filtros.busca ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {filtros.tipo !== "todos" && (
            <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
              Tipo: {filtros.tipo === "comida_e_bebida" ? "Comida e Bebida" : filtros.tipo}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setFiltros((prev) => ({ ...prev, tipo: "todos" }))
                  aplicarFiltros()
                }}
              />
            </div>
          )}

          {filtros.busca && (
            <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
              Busca: {filtros.busca}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setFiltros((prev) => ({ ...prev, busca: "" }))
                  setBusca("")
                  aplicarFiltros()
                }}
              />
            </div>
          )}

          {filtros.categorias?.map((slug) => {
            const categoria = categorias.find((c) => c.slug === slug)
            return categoria ? (
              <div key={slug} className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                {categoria.nome}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => {
                    toggleCategoria(slug)
                    aplicarFiltros()
                  }}
                />
              </div>
            ) : null
          })}

          {filtros.ambientes?.map((slug) => {
            const ambiente = ambientes.find((a) => a.slug === slug)
            return ambiente ? (
              <div key={slug} className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                {ambiente.nome}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => {
                    toggleAmbiente(slug)
                    aplicarFiltros()
                  }}
                />
              </div>
            ) : null
          })}

          <button 
            onClick={limparFiltros} 
            className="text-orange-500 text-sm hover:underline"
          >
            Limpar todos
          </button>
        </div>
      ) : null}

      {/* Modal de filtros */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Filtros</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <h4 className="font-medium text-white mb-2">Tipo</h4>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  className={`p-2 rounded text-sm ${
                    filtros.tipo === "todos" 
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-800 text-white hover:border-orange-500 border border-gray-700"
                  }`}
                  onClick={() => setFiltros((prev) => ({ ...prev, tipo: "todos" }))}
                >
                  Todos
                </button>
                <button
                  className={`p-2 rounded text-sm ${
                    filtros.tipo === "comida" 
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-800 text-white hover:border-orange-500 border border-gray-700"
                  }`}
                  onClick={() => setFiltros((prev) => ({ ...prev, tipo: "comida" }))}
                >
                  Comida
                </button>
                <button
                  className={`p-2 rounded text-sm ${
                    filtros.tipo === "bebida" 
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-800 text-white hover:border-orange-500 border border-gray-700"
                  }`}
                  onClick={() => setFiltros((prev) => ({ ...prev, tipo: "bebida" }))}
                >
                  Bebida
                </button>
                <button
                  className={`p-2 rounded text-sm ${
                    filtros.tipo === "comida_e_bebida" 
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-800 text-white hover:border-orange-500 border border-gray-700"
                  }`}
                  onClick={() => setFiltros((prev) => ({ ...prev, tipo: "comida_e_bebida" }))}
                >
                  Ambos
                </button>
              </div>

              <h4 className="font-medium text-white mb-2">Categorias de Comida</h4>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {categoriasComida.map((categoria) => (
                  <label key={categoria.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(filtros.categorias || []).includes(categoria.slug)}
                      onChange={() => toggleCategoria(categoria.slug)}
                      className="rounded border-gray-700 bg-gray-800 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-white">{categoria.nome}</span>
                  </label>
                ))}
              </div>

              <h4 className="font-medium text-white mb-2">Categorias de Bebida</h4>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {categoriasBebida.map((categoria) => (
                  <label key={categoria.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(filtros.categorias || []).includes(categoria.slug)}
                      onChange={() => toggleCategoria(categoria.slug)}
                      className="rounded border-gray-700 bg-gray-800 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-white">{categoria.nome}</span>
                  </label>
                ))}
              </div>

              <h4 className="font-medium text-white mb-2">Ambientes</h4>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {ambientes.map((ambiente) => (
                  <label key={ambiente.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(filtros.ambientes || []).includes(ambiente.slug)}
                      onChange={() => toggleAm
