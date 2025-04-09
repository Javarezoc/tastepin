export interface Estabelecimento {
  id: string
  nome: string
  descricao: string
  imagem_capa: string
  galeria?: string[]
  tipo: "comida" | "bebida" | "comida_e_bebida"
  endereco: string
  bairro?: string
  cidade?: string
  estado?: string
  google_maps_url?: string
  telefone?: string
  website?: string
  horario_funcionamento?: string
  preco_medio?: number
  plano: "basico" | "pro"
  status: "pendente" | "ativo" | "inativo" | "rejeitado"
  created_at: string
  updated_at: string
  categorias?: Categoria[]
  ambientes?: Ambiente[]
  media_avaliacao?: number
  total_avaliacoes?: number
}

export interface Categoria {
  id: string | number
  nome: string
  tipo: "comida" | "bebida"
  slug: string
  created_at: string
}

export interface Ambiente {
  id: string | number
  nome: string
  slug: string
  created_at: string
}

export interface Filtros {
  tipo?: string
  categoria?: string
  ambiente?: string
  busca?: string
  bairro?: string
}

export interface Avaliacao {
  id: string
  estabelecimento_id: string
  usuario_id: string
  nota: number
  comentario: string
  created_at: string
  usuarios?: {
    nome: string
    avatar_url?: string
  }
}
