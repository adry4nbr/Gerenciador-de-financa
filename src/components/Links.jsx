import { Github, Linkedin } from "lucide-react";

function Links() {
  return (
    <div className="w-full  h-12 flex items-center justify-between px-4 my-2 border-t border-gray-300 dark:border-slate-700 text-xm dark:text-white">
      <p>© 2026 - Desenvolvido por Adryan Galdino Soares</p>

      <div className="flex gap-4">
        <a
          href="https://github.com/adry4nbr/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-500 transition-colors"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/adryan-galdino-262769276"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-500 transition-colors"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </div>
  );
}

export default Links;
