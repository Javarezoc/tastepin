import { getEstabelecimentos, getCategorias, getAmbientes } from "@/services/estabelecimentos"
import BuscaForm from "@/components/busca-form"
import EstabelecimentoCard from "@/components/estabelecimento-card"
import type { Filtros } from "@/types"

interface EstabelecimentosPageProps {
  searchParams: {
    busca?: string
    tipo?: string
    categoria?: string
    ambiente?: string
    bairro?: string
  }
}

export default async function EstabelecimentosPage({ searchParams }: EstabelecimentosPageProps) {
  const filtros: Filtros = {
    tipo: searchParams.tipo as Filtros["tipo"] || "todos",
    categoria: searchParams.categoria || undefined,
    ambiente: searchParams.ambiente || undefined,
    busca: searchParams.busca || "",
    bairro: searchParams.bairro || undefined
  }

  const estabelecimentos = await getEstabelecimentos()
  const categorias = await getCategorias()
  const ambientes = await getAmbientes()

  // Filtrar estabelecimentos com base nos filtros
  const estabelecimentosFiltrados = estabelecimentos.filter(est => {
    // Filtrar por tipo
    if (filtros.tipo && filtros.tipo !== "todos" && est.tipo !== filtros.tipo) {
      return false
    }

    // Filtrar por categoria
    if (filtros.categoria && filtros.categoria !== "todas") {
      const temCategoria = est.categorias?.some(cat => cat.slug === filtros.categoria)
      if (!temCategoria) return false
    }

    // Filtrar por ambiente
    if (filtros.ambiente && filtros.ambiente !== "todos") {
      const temAmbiente = est.ambientes?.some(amb => amb.slug === filtros.ambiente)
      if (!temAmbiente) return false
    }

    // Filtrar por bairro
    if (filtros.bairro && filtros.bairro !== "todos" && est.bairro !== filtros.bairro) {
      return false
    }

    // Filtrar por busca
    if (filtros.busca) {
      const termoBusca = filtros.busca.toLowerCase()
      const nomeMatch = est.nome.toLowerCase().includes(termoBusca)
      const descricaoMatch = est.descricao.toLowerCase().includes(termoBusca)
      if (!nomeMatch && !descricaoMatch) return false
    }

    return true
  })

  return (
    <main>
      <section className="bg-[#171717] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-10">Estabelecimentos</h1>

          <div className="mb-10">
            <BuscaForm categorias={categorias} ambientes={ambientes} />
          </div>

          {estabelecimentosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {estabelecimentosFiltrados.map((estabelecimento) => (
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
    </main>
  )
}
