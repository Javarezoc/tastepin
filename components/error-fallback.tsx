"use client"

import Link from "next/link"

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary?: () => void
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717] text-white p-4">
      <div className="bg-[#1e1e1e] p-8 rounded-xl max-w-md w-full border border-gray-800">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Ops, algo deu errado</h2>

        <div className="bg-[#2a2a2a] p-4 rounded-lg mb-6 overflow-auto">
          <p className="text-red-400 font-mono text-sm">{error.message}</p>
        </div>

        <p className="mb-6 text-gray-300">
          Estamos enfrentando problemas para conectar ao banco de dados. Por favor, tente novamente mais tarde ou entre
          em contato com o suporte.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg text-center hover:bg-gray-600 transition-colors"
          >
            Voltar para a página inicial
          </Link>

          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg text-center hover:bg-orange-600 transition-colors"
            >
              Tentar novamente
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
