// Importa os ícones de Sol e Lua da biblioteca lucide-react
// Eles serão usados para indicar modo claro e modo escuro
import { Sun, Moon } from "lucide-react";

// Componente DarkMode
// Recebe duas propriedades (props):
// isDarkMode -> indica se o modo escuro está ativado
// toggleDarkMode -> função que alterna entre modo claro e escuro
function DarkMode({ isDarkMode, toggleDarkMode }) {
  return (
    // Botão que ativa/desativa o modo escuro
    <button
      onClick={toggleDarkMode} // Quando clicar, executa a função que troca o tema
      className="p-2 rounded-full transition-all duration-300 bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-yellow-400 hover:scale-110"
      // Classes Tailwind usadas:
      // p-2 -> padding interno
      // rounded-full -> botão totalmente arredondado
      // transition-all duration-300 -> animação suave ao mudar propriedades
      // bg-gray-200 -> cor de fundo no modo claro
      // dark:bg-slate-700 -> cor de fundo no modo escuro
      // text-slate-800 -> cor do ícone no modo claro
      // dark:text-yellow-400 -> cor do ícone no modo escuro
      // hover:scale-110 -> aumenta um pouco o tamanho ao passar o mouse
      aria-label="Alternar modo escuro" // Acessibilidade: descreve a função do botão para leitores de tela
    >
      {/* Renderização condicional:
         Se isDarkMode for true mostra o ícone de Sol
         Se for false mostra o ícone de Lua
      */}
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

// Exporta o componente para que ele possa ser usado em outros arquivos
export default DarkMode;
