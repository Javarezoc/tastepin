import { Suspense } from 'react';
import { getEstabelecimentos, getCategorias, getAmbientes } from '@/services/estabelecimentos';
import EstabelecimentoCard from '@/components/estabelecimento-card';
import FiltrosComponent from '@/components/filtros';
import { Filtros } from '@/types';

interface HomePageProps {
  searchParams: {
    tipo?: string;
    categorias?: string;
    ambientes?: string;
    busca?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // Converter parâmetros de busca para filtros
  const filtros: Filtros = {
    tipo: searchParams.tipo as Filtros['tipo'] || 'todos',
    categorias: searchParams.categorias?.split(',') || [],
    ambientes: searchParams.ambientes?.split(',') || [],
    busca: searchParams.busca || ''
  };
  
  // Buscar dados
  const estabelecimentos = await getEstabelecimentos(filtros);
  const categorias = await getCategorias();
  const ambientes = await getAmbientes();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/placeholder.svg?height=600&width=1200&query=restaurant interior" 
            alt="Restaurante" 
            className="w-full h-full object-cover opacity-50" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Descubra os <span className="text-orange-500">melhores lugares</span> para comer e beber
          </h1>
          <p className="text-xl mb-8">
            Encontre e filtre locais para comer e beber na cidade de São Paulo com base nas suas preferências.
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <FiltrosComponent 
          categorias={categorias} 
          ambientes={ambientes} 
          filtrosIniciais={filtros}
        />
        
        <Suspense fallback={<div className="text-center py-12 text-white">Carregando...</div>}>
          {estabelecimentos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {estabelecimentos.map(estabelecimento => (
                <EstabelecimentoCard 
                  key={estabelecimento.id} 
                  estabelecimento={estabelecimento} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-medium mb-2 text-white">Nenhum resultado encontrado</h3>
              <p className="text-gray-400">
                Tente ajustar seus filtros para encontrar mais opções
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
