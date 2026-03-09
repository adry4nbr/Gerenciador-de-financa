// Componente Meses
// Responsável por mostrar a lista de meses e permitir que o usuário selecione um
// Recebe 3 props:
// mesAtivo -> índice do mês atualmente selecionado
// setMesAtivo -> função que altera o mês selecionado no App.jsx
// listaMeses -> array contendo os nomes dos meses
function Meses({ mesAtivo, setMesAtivo, listaMeses }) {
  return (
    // Container principal com padding lateral
    <div className="w-full px-4">
      {/* 
      Container que segura os meses
      overflow-x-auto -> permite rolagem horizontal
      whitespace-nowrap -> impede quebra de linha
      scrollbar-hide -> esconde a barra de rolagem
      py-4 -> padding vertical
      gap-4 md:gap-10 -> espaço entre os meses (maior em telas médias)
      justify-start -> alinha os meses no início
      */}
      <div className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide py-4 gap-4 md:gap-10 justify-start ">
        {/* Percorre a lista de meses */}
        {listaMeses.map((mes, index) => (
          // Cada mês vira um botão clicável
          <div
            key={mes} // chave única usada pelo React
            onClick={() => setMesAtivo(index)} // Ao clicar, altera o mês ativo no App.jsx
            className={`px-4 py-1 rounded-full  cursor-pointer transition-colors border dark:text-white 
              ${
                mesAtivo === index
                  ? "bg-cyan-500 text-white border-cyan-600" // Estilo quando o mês está selecionado
                  : "bg-white dark:bg-slate-600 text-gray-700 border-gray-500  hover:bg-gray-100 hover:dark:bg-slate-900" // Estilo quando o mês NÃO está selecionado
              }`}
          >
            {/* Nome do mês exibido */}
            {mes}
          </div>
        ))}
      </div>
    </div>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default Meses;
