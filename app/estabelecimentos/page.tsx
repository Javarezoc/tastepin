import { getEstabelecimentos, getCategorias, getAmbientes } from "@/services/estabelecimentos"
import EstabelecimentoCard from "@/components/estabelecimento-card"
import FiltrosComponent from "@/components/filtros"
import type { Filtros } from "@/types"

interface EstabelecimentosPageProps {
  searchParams: {
    tipo?: string
    categorias?: string
    ambientes?: string
    busca?: string
  }
}

export default async function EstabelecimentosPage({ searchParams }: EstabelecimentosPageProps) {
  const filtros: Filtros = {
    tipo: searchParams.tipo as Filtros["tipo"] || "todos",
    categorias: searchParams.categorias?.split(",") || [],
    ambientes: searchParams.ambientes?.split(",") || [],
    busca: searchParams.busca || "",
  }

  const estabelecimentos = await getEstabelecimentos(filtros)
  const categorias = await getCategorias()
  const ambientes = await getAmbientes()

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Estabelecimentos</h1>

        <FiltrosComponent categorias={categorias} ambientes={ambientes} filtrosIniciais={filtros} />

        {estabelecimentos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {estabelecimentos.map((estabelecimento) => (
              <EstabelecimentoCard key={estabelecimento.id} estabelecimento={estabelecimento} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <h2 className="text-xl text-white mb-2">Nenhum estabelecimento encontrado</h2>
            <p className="text-gray-400">Tente ajustar os filtros para encontrar o que você está procurando.</p>
          </div>
        )}
      </div>
    </div>
  )
}
