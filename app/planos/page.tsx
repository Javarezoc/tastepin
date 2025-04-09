import Link from "next/link"
import { Check, X } from 'lucide-react'

export default function PlanosPage() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Planos para seu estabelecimento</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Escolha o plano ideal para promover seu estabelecimento e atrair mais clientes
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-gray-800 border-2 border-gray-700 rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-white">Básico</h2>
              <p className="text-gray-400">Para começar</p>
            </div>
            <div className="p-6 text-center border-t border-gray-700">
              <p className="text-4xl font-bold text-white mb-6">
                R$ 0<span className="text-lg font-normal text-gray-400">/mês</span>
              </p>

              <ul className="space-y-3 text-left">
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Cadastro completo do estabelecimento</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Upload de 1 foto de capa</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Visibilidade na plataforma</span>
                </li>
                <li className="flex items-center text-gray-500">
                  <X className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Destaque na plataforma</span>
                </li>
                <li className="flex items-center text-gray-500">
                  <X className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Galeria de imagens</span>
                </li>
                <li className="flex items-center text-gray-500">
                  <X className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Estatísticas de visualização</span>
                </li>
              </ul>
            </div>
            <div className="p-6 border-t border-gray-700">
              <Link
                href="/cadastro"
                className="block w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white text-center rounded transition-colors"
              >
                Começar Grátis
              </Link>
            </div>
          </div>

          <div className="bg-gray-800 border-2 border-orange-500 rounded-lg overflow-hidden shadow-lg shadow-orange-500/10">
            <div className="p-6 text-center">
              <div className="bg-orange-500 text-white text-sm font-medium py-1 px-3 rounded-full w-fit mx-auto mb-2">
                Recomendado
              </div>
              <h2 className="text-2xl font-bold text-white">PRO</h2>
              <p className="text-gray-400">Para profissionais</p>
            </div>
            <div className="p-6 text-center border-t border-gray-700">
              <p className="text-4xl font-bold text-white mb-6">
                R$ 49,90
                <span className="text-lg font-normal text-gray-400">/mês</span>
              </p>

              <ul className="space-y-3 text-left">
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Cadastro completo do estabelecimento</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Upload de até 15 imagens</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Visibilidade na plataforma</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Destaque na plataforma</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Estatísticas de visualização</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
            </div>
            <div className="p-6 border-t border-gray-700">
              <Link
                href="/cadastro-pro"
                className="block w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white text-center rounded transition-colors"
              >
                Assinar Agora
              </Link>
            </div>
          </div>
        </div>

        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Perguntas Frequentes</h2>

          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Como funciona o TastePin?</h3>
              <p className="text-gray-400">
                O TastePin é uma plataforma que conecta pessoas a estabelecimentos gastronômicos. Usuários podem descobrir
                novos lugares, filtrar por categorias e ambientes, e empresas podem promover seus estabelecimentos.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Posso mudar de plano depois?</h3>
              <p className="text-gray-400">
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entrarão em vigor
                no próximo ciclo de cobrança.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Como faço para cadastrar meu estabelecimento?</h3>
              <p className="text-gray-400">
                Basta criar uma conta como empresa, escolher seu plano e preencher as informações do seu estabelecimento.
                Após a revisão da nossa equipe, seu estabelecimento estará visível na plataforma.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Existe período de teste?</h3>
              <p className="text-gray-400">
                Sim, oferecemos 7 dias de teste gratuito do plano PRO para que você possa experimentar todos os recursos
                antes de decidir.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg p-8 text-center max-w-3xl mx-auto border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Pronto para começar?</h2>
          <p className="text-gray-400 mb-6">Cadastre seu estabelecimento agora e comece a atrair mais clientes</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/sobre"
              className="py-2 px-6 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            >
              Saber Mais
            </Link>
            <Link
              href="/cadastro"
              className="py-2 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
            >
              Cadastrar Estabelecimento
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
