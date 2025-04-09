export async function getEstabelecimentoById(id: string): Promise<Estabelecimento | null> {
  const supabase = createServerSupabaseClient()

  // Buscar estabelecimento pelo ID
  const { data: estabelecimento, error } = await supabase
    .from("estabelecimentos")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !estabelecimento) {
    console.error("Erro ao buscar estabelecimento:", error)
    return null
  }

  // Buscar categorias
  const { data: categorias } = await supabase
    .from("estabelecimento_categorias")
    .select("categorias(id, nome, tipo, slug)")
    .eq("estabelecimento_id", id)

  // Buscar ambientes
  const { data: ambientes } = await supabase
    .from("estabelecimento_ambientes")
    .select("ambientes(id, nome, slug)")
    .eq("estabelecimento_id", id)

  // Buscar avaliações para calcular média
  const { data: avaliacoes, error: avaliacoesError } = await supabase
    .from("avaliacoes")
    .select("nota")
    .eq("estabelecimento_id", id)

  let media_avaliacao = 0
  let total_avaliacoes = 0

  if (!avaliacoesError && avaliacoes && avaliacoes.length > 0) {
    total_avaliacoes = avaliacoes.length
    media_avaliacao = avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / total_avaliacoes
  }

  // Adicionar imagem relacionada ao nome se não existir
  if (!estabelecimento.imagem_capa) {
    estabelecimento.imagem_capa = gerarImagemEstabelecimento(estabelecimento.nome, estabelecimento.id)
  }

  return {
    ...estabelecimento,
    categorias: (categorias?.map((c) => c.categorias) as Categoria[]) || [],
    ambientes: (ambientes?.map((a) => a.ambientes) as Ambiente[]) || [],
    media_avaliacao,
    total_avaliacoes
  }
}
