"use client"

import { useState, useEffect } from "react"
import {
  getEstabelecimentosEmDestaque,
  getCategorias,
  getAmbientes,
  buscarEstabelecimentos,
  getBairrosSP,
} from "@/services/estabelecimentos"
import BuscaForm from "@/components/busca-form"
import EstabelecimentoCard from "@/components/estabelecimento-card"
import ImageCarousel from "@/components/image-carousel"
import Link from "next/link"
import type { Estabelecimento, Filtros, Categoria, Ambiente } from "@/types"

export default function Home() {
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [ambientes, setAmbientes] = useState<Ambiente[]>([])
  const [bairros, setBairros] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [resultadoBusca, setResultadoBusca] = useState<Estabelecimento[]>([])
  const [buscaRealizada, setBuscaRealizada] = useState(false)

  // Imagens para o carrossel
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      alt: "Restaurante de alto padrão com decoração elegante",
    },
    {
      src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      alt: "Restaurante ao ar livre com área verde",
    },
  ]

  // Carregar dados iniciais
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true)
      try {
        // Carregar categorias, ambientes e bairros primeiro
        const [categoriasData, ambientesData, bairrosData] = await Promise.all([
          getCategorias(),
          getAmbientes(),
          getBairrosSP(),
        ])

        setCategorias(categoriasData)
        setAmbientes(ambientesData)
        setBairros(bairrosData)

        console.log("Categorias carregadas:", categoriasData?.length || 0)
        console.log("Ambientes carregados:", ambientesData?.length || 0)
        console.log("Bairros carregados:", bairrosData?.length || 0)

        // Depois carregar estabelecimentos
        const estabelecimentosData = await getEstabelecimentosEmDestaque()
        setEstabelecimentos(estabelecimentosData)
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [])

  // Função para realizar busca na página inicial
  const handleSearch = async (filtros: Filtros) => {
    setIsLoading(true)
    try {
      const resultados = await buscarEstabelecimentos(filtros)
      setResultadoBusca(resultados)
      setBuscaRealizada(true)
    } catch (error) {
      console.error("Erro ao buscar estabelecimentos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para limpar a busca
  const limparBusca = () => {
    setBuscaRealizada(false)
    setResultadoBusca([])
  }

  return (
    <main className="bg-[#171717]">
      {/* Hero Section com Carrossel */}
      <section className="relative bg-[#171717] text-white py-24">
        <div className="absolute inset-0 z-0 opacity-70">
          <div className="w-full h-full">
            <ImageCarousel images={carouselImages} />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Descubra os <span className="text-orange-500">melhores lugares</span> para comer e beber
          </h1>
          <p className="text-xl mb-10 max-w-2xl bg-black bg-opacity-70 p-4 rounded-lg shadow-lg border-l-4 border-orange-500 font-medium">
            Encontre e filtre locais para comer e beber na cidade de São Paulo com base nas suas preferências.
          </p>

          <BuscaForm
            categorias={categorias}
            ambientes={ambientes}
            bairros={bairros}
            onSearch={handleSearch}
            isHomePage={true}
          />
        </div>
      </section>

      {/* Resultados da Busca (quando houver) */}
      {buscaRealizada && (
        <section className="py-16 bg-[#171717]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-white">Resultados da Busca</h2>
              <button onClick={limparBusca} className="text-orange-500 hover:text-orange-400 font-medium">
                Limpar Busca
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : resultadoBusca.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resultadoBusca.map((estabelecimento) => (
                  <EstabelecimentoCard key={estabelecimento.id} estabelecimento={estabelecimento} />
                ))}
              </div>
            ) : (
              <div className="bg-[#1e1e1e] p-8 rounded-xl text-center">
                <h2 className="text-xl text-white mb-2">Nenhum estabelecimento encontrado</h2>
                <p className="text-gray-400">Tente ajustar os filtros para encontrar o que você está procurando.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Estabelecimentos em Destaque (mostrar apenas se não houver busca) */}
      {!buscaRealizada && (
        <section className="py-16 bg-[#171717]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-white">Estabelecimentos em Destaque</h2>
              <Link href="/estabelecimentos" className="text-orange-500 hover:text-orange-400 font-medium">
                Ver Todos
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {estabelecimentos.map((estabelecimento) => (
                  <EstabelecimentoCard key={estabelecimento.id} estabelecimento={estabelecimento} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
