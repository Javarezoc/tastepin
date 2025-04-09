import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Avaliacao } from "@/types"

interface AvaliacaoCardProps {
  avaliacao: Avaliacao
}

export default function AvaliacaoCard({ avaliacao }: AvaliacaoCardProps) {
  const usuario = avaliacao.usuarios

  if (!usuario) return null

  // Formatar a data relativa (ex: "há 2 dias")
  const dataRelativa = formatDistanceToNow(new Date(avaliacao.created_at), {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <div className="bg-[#1e1e1e] p-5 rounded-xl mb-4 border border-gray-700">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 mr-3">
          {usuario.avatar_url ? (
            <img src={usuario.avatar_url || "/placeholder.svg"} alt={usuario.nome} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-orange-500 text-white font-bold">
              {usuario.nome.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-white font-medium">{usuario.nome}</h4>
          <p className="text-gray-400 text-sm">{dataRelativa}</p>
        </div>
      </div>

      <div className="flex items-center mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={i < avaliacao.nota ? "#f59e0b" : "none"}
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
        <span className="text-white ml-2">{avaliacao.nota}/5</span>
      </div>

      <p className="text-gray-300">{avaliacao.comentario}</p>
    </div>
  )
}
