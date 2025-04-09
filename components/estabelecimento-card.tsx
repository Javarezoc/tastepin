import { Estabelecimento } from '@/types';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface EstabelecimentoCardProps {
  estabelecimento: Estabelecimento;
}

export default function EstabelecimentoCard({ estabelecimento }: EstabelecimentoCardProps) {
  return (
    <Link href={`/estabelecimentos/${estabelecimento.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-orange-500 transition-all h-full">
        <div className="relative">
          <img
            src={estabelecimento.imagem_capa || "/placeholder.svg?height=400&width=600&query=restaurant"}
            alt={estabelecimento.nome}
            className="w-full h-48 object-cover"
          />
          {estabelecimento.plano === 'pro' && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              Destaque
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-2">{estabelecimento.nome}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {estabelecimento.descricao || ""}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {estabelecimento.categorias?.slice(0, 2).map((categoria) => (
              <span key={categoria.id} className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                {categoria.nome}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {estabelecimento.ambientes?.slice(0, 2).map((ambiente) => (
              <span
                key={ambiente.id}
                className="bg-gray-900 text-gray-300 text-xs px-2 py-1 rounded border border-gray-700"
              >
                {ambiente.nome}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
              <span className="text-sm font-medium text-white">
                {estabelecimento.media_avaliacao?.toFixed(1) || 'Novo'}
              </span>
              {estabelecimento.total_avaliacoes ? (
                <span className="text-xs text-gray-500 ml-1">
                  ({estabelecimento.total_avaliacoes})
                </span>
              ) : null}
            </div>
            <span className="text-xs text-gray-500">
              {estabelecimento.endereco?.split(',')[0]}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
