import type { Avaliacao } from "@/types"
import { Star } from 'lucide-react'
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface AvaliacaoCardProps {
  avaliacao: Avaliacao
}

export default function AvaliacaoCard({ avaliacao }: AvaliacaoCardProps) {
  const usuario = avaliacao.usuario

  if (!usuario) return null

  const iniciais = usuario.nome
    ? usuario.nome
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
    : "??"

  const dataFormatada = format(new Date(avaliacao.created_at), "d 'de' MMMM 'de' yyyy", { locale: ptBR })

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
          {usuario.avatar_url ? (
            <img src={usuario.avatar_url || "/placeholder.svg"} alt={usuario.nome} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <span>{iniciais}</span>
          )}
        </div>
        <div>
          <h4 className="font-medium text-white">{usuario.nome}</h4>
          <p className="text-xs text-gray-400">{dataFormatada}</p>
        </div>
      </div>
      
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= avaliacao.nota ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <span className="font-medium">Visitou:</span>
          <span>{avaliacao.visitou ? "Sim" : "Não"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Atende requisitos:</span>
          <span>{avaliacao.atende_requisitos ? "Sim" : "Não"}</span>
        </div>
      </div>
    </div>
  )
}
