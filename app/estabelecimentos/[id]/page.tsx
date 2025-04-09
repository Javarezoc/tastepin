import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getEstabelecimentoById, getAvaliacoes } from "@/services/estabelecimentos"
import AvaliacaoCard from "@/components/avaliacao-card"
import { MapPin, Phone, Globe, Star, Map, ChevronLeft } from 'lucide-react'

interface EstabelecimentoPageProps {
  params: {
    id: string
  }
}

export default async function EstabelecimentoPage({ params }: EstabelecimentoPageProps) {
  const estabelecimento = await getEstabelecimentoById(params.id)

  if (!estabelecimento) {
    notFound()
  }

  const avaliacoes = await getAvaliacoes(params.id)

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center text-sm mb-6 text-gray-400 hover:text-white">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar para a lista
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative h-64 sm:h-96 w-full rounded-lg overflow-hidden mb-6">
              <img
                src={estabelecimento.imagem_capa || "/placeholder.svg?height=600&width=1200&query=restaurant"}
                alt={estabelecimento.nome}
                className="w-full h-full object-cover"
              />
              {estabelecimento.plano === "pro" && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  PRO
                </div>
              )}
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">{estabelecimento.nome}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium text-white">{estabelecimento.media_avaliacao?.toFixed(1) || "Novo"}</span>
                {estabelecimento.total_avaliacoes ? (
                  <span className="text-sm text-gray-400 ml-1">({estabelecimento.total_avaliacoes} avaliações)</span>
                ) : null}
              </div>

              <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full">
                {estabelecimento.tipo === "comida_e_bebida" ? "Comida e Bebida" : estabelecimento.tipo}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {estabelecimento.categorias?.map((categoria) => (
                <div key={categoria.id} className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full">
                  {categoria.nome}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {estabelecimento.ambientes?.map((ambiente) => (
                <div key={ambiente.id} className="bg-gray-700 text-white text-sm px-3 py-1 rounded-full">
                  {ambiente.nome}
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Sobre</h2>
              <p className="text-gray-300">{estabelecimento.descricao || "Sem descrição disponível."}</p>
            </div>

            {estabelecimento.galeria && estabelecimento.galeria.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Galeria</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {estabelecimento.galeria.map((img, index) => (
                    <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                      <img
                        src={img || "/placeholder.svg?height=300&width=400&query=food"}
                        alt={`${estabelecimento.nome} - Imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Avaliações</h2>
              {avaliacoes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {avaliacoes.map((avaliacao) => (
                    <AvaliacaoCard key={avaliacao.id} avaliacao={avaliacao} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Ainda não há avaliações para este estabelecimento.</p>
              )}
            </div>
          </div>

          <div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 sticky top-4">
              <h3 className="text-lg font-semibold text-white mb-4">Informações</h3>

              {estabelecimento.endereco && (
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Endereço</p>
                    <p className="text-sm text-gray-400">{estabelecimento.endereco}</p>
                    {estabelecimento.cidade && estabelecimento.estado && (
                      <p className="text-sm text-gray-400">
                        {estabelecimento.cidade}, {estabelecimento.estado}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {estabelecimento.telefone && (
                <div className="flex items-start mb-4">
                  <Phone className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Telefone</p>
                    <p className="text-sm text-gray-400">{estabelecimento.telefone}</p>
                  </div>
                </div>
              )}

              {estabelecimento.website && (
                <div className="flex items-start mb-4">
                  <Globe className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Website</p>
                    <a
                      href={estabelecimento.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:underline"
                    >
                      {estabelecimento.website}
                    </a>
                  </div>
                </div>
              )}

              {estabelecimento.google_maps_url && (
                <a
                  href={estabelecimento.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
                >
                  <Map className="h-4 w-4" />
                  Ver no Google Maps
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
