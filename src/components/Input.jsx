// Componente Input reutilizável
// Ele serve para padronizar o estilo de todos os inputs do projeto
function Input(props) {
  return (
    // Elemento input do HTML
    <input
      // Classes do Tailwind que definem o estilo do input
      className="rounded-3xl border border-gray-200 dark:border-slate-500 py-2 px-4 dark:bg-slate-700 bg-slate-100 mb-3 dark:text-slate-200 text-slate-800"
      /*
      Explicação das classes:
      rounded-3xl -> bordas bem arredondadas
      border -> adiciona uma borda
      border-gray-200 -> cor da borda no modo claro
      dark:border-slate-500 -> cor da borda no modo escuro
      py-2 -> padding vertical
      px-4 -> padding horizontal
      dark:bg-slate-700 -> fundo no modo escuro
      bg-slate-100 -> fundo no modo claro
      mb-3 -> margem inferior (espaço entre inputs)
      dark:text-slate-200 -> cor do texto no modo escuro
      text-slate-800 -> cor do texto no modo claro
      */

      // {...props} espalha todas as propriedades recebidas
      // Isso permite passar atributos como:
      // type, placeholder, value, onChange, name, etc
      {...props}
    />
  );
}

// Exporta o componente para poder usar em outros arquivos
export default Input;
