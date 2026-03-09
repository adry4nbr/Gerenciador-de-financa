// Importa os ícones de editar (lápis) e deletar (lixeira) da biblioteca lucide-react
import { PencilIcon, Trash2Icon } from "lucide-react";

// Importa a função que retorna a cor da categoria (classe Tailwind)
import { getCategoryColor } from "./CategoryColors";

// Componente History
// Recebe as seguintes props:
// transactions -> lista de transações do mês
// onDeleteTransactionClick -> função para deletar uma transação
// onEditTransaction -> função para editar uma transação
// nomeMes -> nome do mês exibido no histórico
function History({
  transactions = [],
  onDeleteTransactionClick,
  onEditTransaction,
  nomeMes,
}) {
  // Função para formatar a data de ISO (YYYY-MM-DD) para formato brasileiro (DD/MM/YYYY)
  const formatarDataExibicao = (dataISO) => {
    // Divide a data em ano, mês e dia
    const [ano, mes, dia] = dataISO.split("-");

    // Retorna no formato brasileiro
    return `${dia}/${mes}/${ano}`;
  };

  // Se não existir transações ou o array estiver vazio
  if (!transactions || transactions.length === 0) {
    return (
      // Card informando que não há transações
      <div className="flex flex-col w-full md:w-3/5 min-h-44 md:my-0 md:ml-2 md:mr-4 rounded-2xl border dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-800 p-4 items-center">
        {/* Cabeçalho */}
        <header className="flex w-full gap-12 mb-12 md:mb-0 items-center">
          {/* Título */}
          <h2 className="w-4/5 font-medium dark:text-white">
            Historico - {nomeMes}{" "}
          </h2>

          {/* Quantidade de transações */}
          <p className="flex w-1/5 justify-end text-xs text-gray-400">
            {transactions.length} Transações
          </p>
        </header>

        {/* Mensagem informando que não existem transações */}
        <p className="flex text-gray-400 size-full justify-center items-center">
          Nenhuma transação nesse mês.
        </p>
      </div>
    );
  }

  return (
    // Container principal do histórico
    <div className="flex flex-col w-full md:w-3/5 max-h-95 md:min-h-44 md:my-0 md:ml-2 md:mr-4 rounded-2xl border dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-800">
      {/* Cabeçalho */}
      <header className="flex w-full h-12 items-center p-4">
        {/* Título */}
        <h2 className="w-4/5 font-medium dark:text-white">
          Historico - {nomeMes}{" "}
        </h2>

        {/* Quantidade total de transações */}
        <p className="flex w-1/5 justify-end text-xs text-gray-400">
          {transactions.length} Transações
        </p>
      </header>

      {/* Área onde as transações serão exibidas */}
      <main className="flex size-full ">
        {/* Lista de transações */}
        {/* overflow-y-auto -> permite rolagem vertical */}
        {/* scrollbar-thin -> deixa a barra de rolagem mais fina */}
        <ul className="flex overflow-y-auto size-full px-4 pb-4 flex-col gap-2 scrollbar-thin max-h-75">
          {/* Percorre todas as transações */}
          {transactions.map((item) => (
            // Cada transação é um item da lista
            <li
              key={item.id} // chave única para o React identificar o elemento
              className="flex items-center size-full h-16 p-4 border border-gray-300 dark:border-slate-600 rounded-xl"
            >
              {/* Bolinha colorida da categoria */}
              <span
                className={`rounded-full size-3 ${getCategoryColor(item.categoria)}`}
              ></span>

              {/* Nome da transação, categoria e data */}
              <div className="pl-2 flex flex-col justify-center w-1/2 dark:text-white">
                {/* Nome da transação */}
                <h3>{item.nome}</h3>

                {/* Categoria e data */}
                <p className="flex text-xs text-gray-400 gap-1">
                  <span>{item.categoria}</span>

                  {/* ponto separador */}
                  <span>.</span>

                  {/* data formatada */}
                  <span>{formatarDataExibicao(item.data)}</span>
                </p>
              </div>

              {/* Área do valor e botões */}
              <div className="flex justify-end w-1/2 items-center pl-4">
                {/* Valor da transação */}
                {/* Verde se for receita, vermelho se for despesa */}
                <span
                  className={
                    item.tipo === "receita" ? "text-green-500" : "text-red-500"
                  }
                >
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.valor)}
                </span>

                {/* Botão de editar transação */}
                <button
                  className=" text-gray-500 pr-2 pl-4"
                  onClick={() => onEditTransaction(item)} // envia a transação para edição
                >
                  <PencilIcon size={16} />
                </button>

                {/* Botão de deletar transação */}
                <button
                  onClick={() => onDeleteTransactionClick(item.id)} // envia o id da transação para deletar
                  className=" text-red-500 px-2"
                >
                  <Trash2Icon size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

// Exporta o componente para uso em outros arquivos
export default History;
