import { Sun, Moon } from "lucide-react";

// Receba a função pelo nome correto 'toggleDarkMode'
function DarkMode({ isDarkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode} // Chame a função corretamente
      className="p-2 rounded-full transition-all duration-300 bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-yellow-400 hover:scale-110"
      aria-label="Alternar modo escuro"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
export default DarkMode;
