import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TastePin - Descubra os melhores lugares para comer e beber',
  description: 'Encontre os melhores restaurantes, bares e cafés em São Paulo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto py-4 px-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-orange-500">
                Taste<span className="text-white">Pin</span>
              </Link>
              <nav className="hidden md:flex gap-4">
                <Link href="/" className="text-white hover:text-orange-500 transition-colors">
                  Início
                </Link>
                <Link href="/estabelecimentos" className="text-white hover:text-orange-500 transition-colors">
                  Estabelecimentos
                </Link>
                <Link href="/planos" className="text-white hover:text-orange-500 transition-colors">
                  Planos
                </Link>
              </nav>
              <Link
                href="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
              >
                Entrar
              </Link>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="bg-gray-900 border-t border-gray-800 py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <Link href="/" className="text-xl font-bold text-orange-500">
                    Taste<span className="text-white">Pin</span>
                  </Link>
                  <p className="text-gray-400 mt-2">Descubra os melhores lugares para comer e beber em São Paulo</p>
                </div>

                <div className="flex space-x-4">
                  <Link href="/termos" className="text-gray-400 hover:text-white transition-colors">
                    Termos de Uso
                  </Link>
                  <Link href="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                    Privacidade
                  </Link>
                  <Link href="/contato" className="text-gray-400 hover:text-white transition-colors">
                    Contato
                  </Link>
                </div>
              </div>

              <div className="mt-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} TastePin. Todos os direitos reservados.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
