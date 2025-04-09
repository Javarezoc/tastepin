import { createServerSupabaseClient } from "@/lib/supabase"
import type { Ambiente, Categoria, Estabelecimento, Filtros, Avaliacao } from "@/types"

// Função para gerar uma URL de imagem com base no nome do estabelecimento
function gerarImagemEstabelecimento(nome: string, id: string): string {
  // Lista de tipos de imagens para diferentes estabelecimentos
  const tiposImagens = [
    "restaurant",
    "cafe",
    "bistro",
    "bar",
    "pub",
    "fine-dining",
    "outdoor-dining",
    "coffee-shop",
    "bakery",
    "pizzeria",
  ]

  // Usar o ID para determinar qual tipo de imagem usar (para diversidade)
  const indice = Number.parseInt(id.substring(0, 8), 16) % tiposImagens.length
  const tipoImagem = tiposImagens[indice]

  // Criar uma query baseada no nome e tipo
  const query = `${nome} ${tipoImagem}`

  // Retornar URL de placeholder com a query
  return `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(query)}`
}

export async function getEstabelecimentos(): Promise<Estabelecimento[]> {
  const supabase = createServerSupabaseClient()

  // Buscar todos os estabelecimentos ativos
  const { data: estabelecimentos, error } = await supabase
    .from("estabelecimentos")
    .select("*")
    .eq("status", "ativo")

  if (error) {
    console.error("Erro ao buscar estabelecimentos:", error)
    return []
  }

  // Para cada estabelecimento, buscar suas categorias e ambientes
  const estabelecimentosCompletos = await Promise.all(
    estabelecimentos.map(async (estabelecimento) => {
      // Buscar categorias
      const { data: categoriasRelacionadas } = await supabase
        .from("estabelecimento_categorias")
        .select("categoria_id")
        .eq("estabelecimento_id", estabelecimento.id)

      let categorias: Categoria[] = []
      if (categoriasRelacionadas && categoriasRelacionadas.length > 0) {
        const categoriaIds = categoriasRelacionadas.map((rel) => rel.categoria_id)
        const { data: categoriasData } = await supabase.from("categorias").select("*").in("id", categoriaIds)

        categorias = categoriasData || []
      }

      // Buscar ambientes
      const { data: ambientesRelacionados } = await supabase
        .from("estabelecimento_ambientes")
        .select("ambiente_id")
        .eq("estabelecimento_id", estabelecimento.id)

      let ambientes: Ambiente[] = []
      if (ambientesRelacionados && ambientesRelacionados.length > 0) {
        const ambienteIds = ambientesRelacionados.map((rel) => rel.ambiente_id)
        const { data: ambientesData } = await supabase.from("ambientes").select("*").in("id", ambienteIds)

        ambientes = ambientesData || []
      }

      // Adicionar imagem relacionada ao nome se não existir
      if (!estabelecimento.imagem_capa) {
        estabelecimento.imagem_capa = gerarImagemEstabelecimento(estabelecimento.nome, estabelecimento.id)
      }

      return {
        ...estabelecimento,
        categorias,
        ambientes,
      }
    }),
  )

  return estabelecimentosCompletos
}

export async function getEstabelecimentosEmDestaque(): Promise<Estabelecimento[]> {
  const supabase = createServerSupabaseClient()

  // Buscar estabelecimentos com plano 'pro' e status 'ativo'
  const { data: estabelecimentos, error } = await supabase
    .from("estabelecimentos")
    .select("*")
    .eq("plano", "pro")
    .eq("status", "ativo")
    .limit(6)

  if (error) {
    console.error("Erro ao buscar estabelecimentos em destaque:", error)
    return []
  }

  // Para cada estabelecimento, buscar suas categorias e ambientes
  const estabelecimentosCompletos = await Promise.all(
    estabelecimentos.map(async (estabelecimento) => {
      // Buscar categorias
      const { data: categoriasRelacionadas } = await supabase
        .from("estabelecimento_categorias")
        .select("categoria_id")
        .eq("estabelecimento_id", estabelecimento.id)

      let categorias: Categoria[] = []
      if (categoriasRelacionadas && categoriasRelacionadas.length > 0) {
        const categoriaIds = categoriasRelacionadas.map((rel) => rel.categoria_id)
        const { data: categoriasData } = await supabase.from("categorias").select("*").in("id", categoriaIds)

        categorias = categoriasData || []
      }

      // Buscar ambientes
      const { data: ambientesRelacionados } = await supabase
        .from("estabelecimento_ambientes")
        .select("ambiente_id")
        .eq("estabelecimento_id", estabelecimento.id)

      let ambientes: Ambiente[] = []
      if (ambientesRelacionados && ambientesRelacionados.length > 0) {
        const ambienteIds = ambientesRelacionados.map((rel) => rel.ambiente_id)
        const { data: ambientesData } = await supabase.from("ambientes").select("*").in("id", ambienteIds)

        ambientes = ambientesData || []
      }

      // Adicionar imagem relacionada ao nome se não existir
      if (!estabelecimento.imagem_capa) {
        estabelecimento.imagem_capa = gerarImagemEstabelecimento(estabelecimento.nome, estabelecimento.id)
      }

      return {
        ...estabelecimento,
        categorias,
        ambientes,
      }
    }),
  )

  return estabelecimentosCompletos
}

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
  const { data: categoriasRelacionadas } = await supabase
    .from("estabelecimento_categorias")
    .select("categoria_id")
    .eq("estabelecimento_id", id)

  let categorias: Categoria[] = []
  if (categoriasRelacionadas && categoriasRelacionadas.length > 0) {
    const categoriaIds = categoriasRelacionadas.map((rel) => rel.categoria_id)
    const { data: categoriasData } = await supabase.from("categorias").select("*").in("id", categoriaIds)

    categorias = categoriasData || []
  }

  // Buscar ambientes
  const { data: ambientesRelacionados } = await supabase
    .from("estabelecimento_ambientes")
    .select("ambiente_id")
    .eq("estabelecimento_id", id)

  let ambientes: Ambiente[] = []
  if (ambientesRelacionados && ambientesRelacionados.length > 0) {
    const ambienteIds = ambientesRelacionados.map((rel) => rel.ambiente_id)
    const { data: ambientesData } = await supabase.from("ambientes").select("*").in("id", ambienteIds)

    ambientes = ambientesData || []
  }

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
    categorias,
    ambientes,
    media_avaliacao,
    total_avaliacoes
  }
}

export async function buscarEstabelecimentos(filtros: Filtros): Promise<Estabelecimento[]> {
  const supabase = createServerSupabaseClient()

  let query = supabase.from("estabelecimentos").select("*").eq("status", "ativo")

  // Aplicar filtro por tipo
  if (filtros.tipo && filtros.tipo !== "todos") {
    query = query.eq("tipo", filtros.tipo)
  }

  // Aplicar filtro por bairro
  if (filtros.bairro && filtros.bairro !== "todos") {
    query = query.eq("bairro", filtros.bairro)
  }

  // Buscar estabelecimentos
  const { data: estabelecimentos, error } = await query

  if (error) {
    console.error("Erro ao buscar estabelecimentos:", error)
    return []
  }

  // Filtrar por categoria e ambiente após buscar os dados
  const estabelecimentosFiltrados = [...estabelecimentos]

  // Para cada estabelecimento, buscar suas categorias e ambientes
  let estabelecimentosCompletos = await Promise.all(
    estabelecimentosFiltrados.map(async (estabelecimento) => {
      // Buscar categorias
      const { data: categoriasRelacionadas } = await supabase
        .from("estabelecimento_categorias")
        .select("categoria_id")
        .eq("estabelecimento_id", estabelecimento.id)

      let categorias: Categoria[] = []
      if (categoriasRelacionadas && categoriasRelacionadas.length > 0) {
        const categoriaIds = categoriasRelacionadas.map((rel) => rel.categoria_id)
        const { data: categoriasData } = await supabase.from("categorias").select("*").in("id", categoriaIds)

        categorias = categoriasData || []
      }

      // Buscar ambientes
      const { data: ambientesRelacionados } = await supabase
        .from("estabelecimento_ambientes")
        .select("ambiente_id")
        .eq("estabelecimento_id", estabelecimento.id)

      let ambientes: Ambiente[] = []
      if (ambientesRelacionados && ambientesRelacionados.length > 0) {
        const ambienteIds = ambientesRelacionados.map((rel) => rel.ambiente_id)
        const { data: ambientesData } = await supabase.from("ambientes").select("*").in("id", ambienteIds)

        ambientes = ambientesData || []
      }

      // Adicionar imagem relacionada ao nome se não existir
      if (!estabelecimento.imagem_capa) {
        estabelecimento.imagem_capa = gerarImagemEstabelecimento(estabelecimento.nome, estabelecimento.id)
      }

      return {
        ...estabelecimento,
        categorias,
        ambientes,
      }
    }),
  )

  // Filtrar por categoria
  if (filtros.categoria && filtros.categoria !== "todas") {
    estabelecimentosCompletos = estabelecimentosCompletos.filter((est) =>
      est.categorias?.some((cat: Categoria) => cat.slug === filtros.categoria),
    )
  }

  // Filtrar por ambiente
  if (filtros.ambiente && filtros.ambiente !== "todos") {
    estabelecimentosCompletos = estabelecimentosCompletos.filter((est) =>
      est.ambientes?.some((amb: Ambiente) => amb.slug === filtros.ambiente),
    )
  }

  // Filtrar por busca
  if (filtros.busca) {
    const termoBusca = filtros.busca.toLowerCase()
    estabelecimentosCompletos = estabelecimentosCompletos.filter(
      (est) => est.nome.toLowerCase().includes(termoBusca) || est.descricao.toLowerCase().includes(termoBusca),
    )
  }

  return estabelecimentosCompletos
}

export async function getCategorias(): Promise<Categoria[]> {
  const supabase = createServerSupabaseClient()

  // Buscar todas as categorias da tabela, ordenadas por tipo e nome
  const { data, error } = await supabase.from("categorias").select("*").order("tipo").order("nome")

  if (error) {
    console.error("Erro ao buscar categorias:", error)
    return []
  }

  return data || []
}

export async function getAmbientes(): Promise<Ambiente[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("ambientes").select("*").order("nome")

  if (error) {
    console.error("Erro ao buscar ambientes:", error)
    return []
  }

  return data || []
}

// Função para obter a lista de bairros de São Paulo
export async function getBairrosSP(): Promise<string[]> {
  // Lista de bairros populares de São Paulo
  return [
    "Alto de Pinheiros",
    "Bela Vista",
    "Brooklin",
    "Butantã",
    "Campo Belo",
    "Consolação",
    "Higienópolis",
    "Ipiranga",
    "Itaim Bibi",
    "Jardim Paulista",
    "Jardins",
    "Lapa",
    "Liberdade",
    "Moema",
    "Morumbi",
    "Paraíso",
    "Perdizes",
    "Pinheiros",
    "Santana",
    "Santo Amaro",
    "Saúde",
    "Tatuapé",
    "Vila Leopoldina",
    "Vila Madalena",
    "Vila Mariana",
    "Vila Olímpia",
  ]
}

export async function getAvaliacoes(estabelecimentoId: string): Promise<Avaliacao[]> {
  const supabase = createServerSupabaseClient()

  // Buscar avaliações para o estabelecimento
  const { data, error } = await supabase
    .from("avaliacoes")
    .select("*, usuarios(nome, avatar_url)")
    .eq("estabelecimento_id", estabelecimentoId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao buscar avaliações:", error)
    return []
  }

  return data || []
}
