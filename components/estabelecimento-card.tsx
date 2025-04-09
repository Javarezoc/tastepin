import Link from "next/link"
import type { Estabelecimento } from "@/types"

interface EstabelecimentoCardProps {
  estabelecimento: Estabelecimento
}

export default function EstabelecimentoCard({ estabelecimento }: EstabelecimentoCardProps) {
  // Extrair o endereço e bairro para exibição
  const endereco = estabelecimento.endereco
  const bairro = estabelecimento.bairro || "Centro"

  // Determinar se o estabelecimento está em destaque (plano pro)
  const emDestaque = estabelecimento.plano === "pro"

  return (
    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-gray-700 hover:border-orange-500 transition-all minimal-shadow hover:shadow-md">
      <Link href={`/estabelecimentos/${estabelecimento.id}`}>
        <div className="relative">
          <img
            src={estabelecimento.imagem_capa || "/images/placeholder-restaurant.jpg"}
            alt={estabelecimento.nome}
            className="w-full h-48 object-cover"
          />
          {emDestaque && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Destaque
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-2">{estabelecimento.nome}</h3>
          <div className="flex items-center text-gray-400 text-sm mb-4">
            <span className="inline-block mr-1">📍</span>
            <span>
              {endereco} - <span className="font-medium text-orange-400">{bairro}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {estabelecimento.categorias?.slice(0, 2).map((categoria) => (
              <span key={categoria.id} className="bg-[#2a2a2a] text-white text-xs px-3 py-1 rounded-full">
                {categoria.nome}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {estabelecimento.ambientes?.slice(0, 2).map((ambiente) => (
              <span
                key={ambiente.id}
                className="bg-[#333333] text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700"
              >
                {ambiente.nome}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}
