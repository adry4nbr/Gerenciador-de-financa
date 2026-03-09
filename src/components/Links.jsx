// Importa os ícones do GitHub e LinkedIn da biblioteca lucide-react
// Eles serão usados como links para suas redes sociais
import { Github, Linkedin } from "lucide-react";

// Componente Links
// Responsável por mostrar o rodapé com seu nome e links das redes sociais
function Links() {
  return (
    // Container principal do rodapé
    <div className="w-full  h-12 flex items-center justify-between px-4 my-2 border-t border-gray-300 dark:border-slate-700 text-xm dark:text-white">
      {/* 
      w-full -> ocupa toda largura da tela
      h-12 -> altura do rodapé
      flex -> usa flexbox para alinhar elementos
      items-center -> centraliza verticalmente
      justify-between -> coloca um item na esquerda e outro na direita
      px-4 -> espaçamento horizontal interno
      my-2 -> margem vertical
      border-t -> borda no topo
      border-gray-300 -> cor da borda no modo claro
      dark:border-slate-700 -> borda no modo escuro
      text-xm -> tamanho do texto
      dark:text-white -> cor do texto no modo escuro
      */}

      {/* Texto com direitos autorais */}
      <p>© 2026 - Desenvolvido por Adryan Galdino Soares</p>

      {/* Container dos ícones das redes sociais */}
      <div className="flex gap-4">
        {/* 
        flex -> coloca os ícones lado a lado
        gap-4 -> espaço entre os ícones
        */}

        {/* Link para o GitHub */}
        <a
          href="https://github.com/adry4nbr/" // URL do perfil do GitHub
          target="_blank" // abre o link em nova aba
          rel="noopener noreferrer" // segurança ao abrir links externos
          className="hover:text-cyan-500 transition-colors"
          /*
          hover:text-cyan-500 -> muda a cor quando o mouse passa por cima
          transition-colors -> animação suave na troca de cor
          */
        >
          {/* Ícone do GitHub */}
          <Github size={20} />
        </a>

        {/* Link para o LinkedIn */}
        <a
          href="https://www.linkedin.com/in/adryan-galdino-262769276" // URL do perfil do LinkedIn
          target="_blank" // abre em nova aba
          rel="noopener noreferrer" // proteção contra ataques de segurança
          className="hover:text-cyan-500 transition-colors"
        >
          {/* Ícone do LinkedIn */}
          <Linkedin size={20} />
        </a>
      </div>
    </div>
  );
}

// Exporta o componente para poder ser usado em outros arquivos
export default Links;
