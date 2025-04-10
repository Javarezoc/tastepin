import type React from "react"
import "./globals.css"
import Link from "next/link"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "@/components/error-fallback"

export const metadata = {
  title: "TastePin - Descubra os melhores lugares para comer e beber",
  description: "Encontre e filtre locais para comer e beber na cidade de São Paulo com base nas suas preferências.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#171717] text-white">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <header className="bg-[#171717] border-b border-gray-800">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-orange-500">
                  TastePin
                </Link>

                <div className="flex items-center space-x-6">
                  <Link href="/" className="text-white hover:text-orange-500 transition-colors">
                    Início
                  </Link>
                  <Link href="/sobre" className="text-white hover:text-orange-500 transition-colors">
                    Sobre
                  </Link>
                  <Link
                    href="/login"
                    className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Entrar
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {children}

          <footer className="bg-[#171717] border-t border-gray-800 py-10">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <Link href="/" className="text-2xl font-bold text-orange-500">
                    TastePin
                  </Link>
                  <p className="text-gray-400 mt-2">Descubra os melhores lugares para comer e beber em São Paulo</p>
                </div>

                <div className="flex space-x-6">
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
        </ErrorBoundary>
      </body>
    </html>
  )
}
