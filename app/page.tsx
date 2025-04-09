import Link from 'next/link';

export default function HomePage() {
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
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Bem-vindo ao TastePin</h2>
          <p className="mb-8">Estamos configurando o site para você. Em breve você poderá explorar os melhores estabelecimentos.</p>
          <Link 
            href="/planos" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Conheça nossos planos
          </Link>
        </div>
      </div>
    </div>
  );
}
