export type User = {
  id: string;
  email: string;
  role: 'user' | 'empresa' | 'user_company';
  nome: string;
  avatar_url: string | null;
  telefone: string | null;
  data_nascimento: string | null;
  created_at: string;
  updated_at: string;
};

export type Categoria = {
  id: number;
  nome: string;
  tipo: 'comida' | 'bebida';
  slug: string;
  created_at: string;
};

export type Ambiente = {
  id: number;
  nome: string;
  slug: string;
  created_at: string;
};

export type Estabelecimento = {
  id: string;
  nome: string;
  descricao: string | null;
  imagem_capa: string | null;
  galeria: string[] | null;
  tipo: 'comida' | 'bebida' | 'comida_e_bebida';
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  latitude: number | null;
  longitude: number | null;
  telefone: string | null;
  website: string | null;
  google_maps_url: string | null;
  criado_por: string;
  plano: 'basico' | 'pro';
  status: 'pendente' | 'ativo' | 'inativo' | 'rejeitado';
  created_at: string;
  updated_at: string;
  categorias?: Categoria[];
  ambientes?: Ambiente[];
  media_avaliacao?: number;
  total_avaliacoes?: number;
};

export type Avaliacao = {
  id: string;
  user_id: string;
  estabelecimento_id: string;
  visitou: boolean;
  nota: number;
  atende_requisitos: boolean;
  created_at: string;
  updated_at: string;
  usuario?: User;
};

export type Favorito = {
  id: string;
  user_id: string;
  estabelecimento_id: string;
  created_at: string;
};

export type Filtros = {
  categorias?: string[];
  ambientes?: string[];
  tipo?: 'comida' | 'bebida' | 'comida_e_bebida' | 'todos';
  busca?: string;
};
