import { createServerSupabaseClient } from '@/lib/supabase';
import { Ambiente, Avaliacao, Categoria, Estabelecimento, Filtros } from '@/types';

export async function getEstabelecimentos(filtros?: Filtros): Promise<Estabelecimento[]> {
  const supabase = createServerSupabaseClient();
  
  let query = supabase
    .from('estabelecimentos')
    .select(`
      *,
      categorias:estabelecimento_categorias(
        categoria:categorias(*)
      ),
      ambientes:estabelecimento_ambientes(
        ambiente:ambientes(*)
      )
    `)
    .eq('status', 'ativo');
  
  if (filtros?.tipo && filtros.tipo !== 'todos') {
    if (filtros.tipo === 'comida_e_bebida') {
      query = query.eq('tipo', filtros.tipo);
    } else {
      query = query.or(`tipo.eq.${filtros.tipo},tipo.eq.comida_e_bebida`);
    }
  }
  
  if (filtros?.busca) {
    query = query.ilike('nome', `%${filtros.busca}%`);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Erro ao buscar estabelecimentos:', error);
    return [];
  }
  
  // Processar os dados para o formato esperado
  const estabelecimentos = data.map(item => {
    const categorias = item.categorias?.map((cat: any) => cat.categoria) || [];
    const ambientes = item.ambientes?.map((amb: any) => amb.ambiente) || [];
    
    return {
      ...item,
      categorias,
      ambientes
    };
  });
  
  // Filtrar por categorias se necessário
  let resultado = estabelecimentos;
  if (filtros?.categorias && filtros.categorias.length > 0) {
    resultado = resultado.filter(est => 
      est.categorias?.some(cat => filtros.categorias?.includes(cat.slug))
    );
  }
  
  // Filtrar por ambientes se necessário
  if (filtros?.ambientes && filtros.ambientes.length > 0) {
    resultado = resultado.filter(est => 
      est.ambientes?.some(amb => filtros.ambientes?.includes(amb.slug))
    );
  }
  
  return resultado;
}

export async function getEstabelecimentoById(id: string): Promise<Estabelecimento | null> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('estabelecimentos')
    .select(`
      *,
      categorias:estabelecimento_categorias(
        categoria:categorias(*)
      ),
      ambientes:estabelecimento_ambientes(
        ambiente:ambientes(*)
      )
    `)
    .eq('id', id)
    .eq('status', 'ativo')
    .single();
  
  if (error) {
    console.error('Erro ao buscar estabelecimento:', error);
    return null;
  }
  
  // Processar os dados para o formato esperado
  const categorias = data.categorias?.map((cat: any) => cat.categoria) || [];
  const ambientes = data.ambientes?.map((amb: any) => amb.ambiente) || [];
  
  // Buscar avaliações
  const { data: avaliacoes, error: avaliacoesError } = await supabase
    .from('avaliacoes')
    .select('*, usuario:users(*)')
    .eq('estabelecimento_id', id);
  
  if (avaliacoesError) {
    console.error('Erro ao buscar avaliações:', avaliacoesError);
  }
  
  // Calcular média de avaliações
  const notasValidas = avaliacoes?.filter(a => a.visitou).map(a => a.nota) || [];
  const mediaAvaliacao = notasValidas.length > 0 
    ? notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length 
    : 0;
  
  return {
    ...data,
    categorias,
    ambientes,
    media_avaliacao: mediaAvaliacao,
    total_avaliacoes: notasValidas.length
  };
}

export async function getCategorias(): Promise<Categoria[]> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nome');
  
  if (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
  
  return data;
}

export async function getAmbientes(): Promise<Ambiente[]> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('ambientes')
    .select('*')
    .order('nome');
  
  if (error) {
    console.error('Erro ao buscar ambientes:', error);
    return [];
  }
  
  return data;
}

export async function getAvaliacoes(estabelecimentoId: string): Promise<Avaliacao[]> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('avaliacoes')
    .select('*, usuario:users(*)')
    .eq('estabelecimento_id', estabelecimentoId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erro ao buscar avaliações:', error);
    return [];
  }
  
  return data;
}
