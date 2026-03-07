import { PencilIcon, Trash2Icon } from "lucide-react";
import { getCategoryColor } from "./CategoryColors";

function History({
  transactions = [],
  onDeleteTransactionClick,
  onEditTransaction,
  nomeMes,
}) {
  const formatarDataExibicao = (dataISO) => {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col w-full md:w-3/5 min-h-44 md:my-0 md:ml-2 md:mr-4 rounded-2xl border dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-800 p-4 items-center">
        <header className="flex w-full gap-12 mb-12 md:mb-0 items-center">
          <h2 className="w-4/5 font-medium dark:text-white">
            Historico - {nomeMes}{" "}
          </h2>
          <p className="flex w-1/5 justify-end text-xs text-gray-400">
            {transactions.length} Transações
          </p>
        </header>
        <p className="flex text-gray-400 size-full justify-center items-center">
          Nenhuma transação nesse mês.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full md:w-3/5 max-h-95 md:min-h-44 md:my-0 md:ml-2 md:mr-4 rounded-2xl border dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-800">
      <header className="flex w-full h-12 items-center p-4">
        <h2 className="w-4/5 font-medium dark:text-white">
          Historico - {nomeMes}{" "}
        </h2>
        <p className="flex w-1/5 justify-end text-xs text-gray-400">
          {transactions.length} Transações
        </p>
      </header>

      {/* aqui onde vai ficar as transações */}
      <main className="flex size-full ">
        {/* overflow e scrollbar-thin para fazer a rolagem vertical*/}
        <ul className="flex overflow-y-auto size-full px-4 pb-4 flex-col gap-2 scrollbar-thin max-h-75">
          {transactions.map((item) => (
            <li
              key={item.id}
              className="flex items-center size-full h-16 p-4 border border-gray-300 dark:border-slate-600 rounded-xl"
            >
              {/* Bolinha colorida */}
              <span
                className={`rounded-full size-3 ${getCategoryColor(item.categoria)}`}
              ></span>
              {/* Nome, categoria e data da transação */}
              <div className="pl-2 flex flex-col justify-center w-1/2 dark:text-white">
                <h3>{item.nome}</h3>
                <p className="flex text-xs text-gray-400 gap-1">
                  <span>{item.categoria}</span>
                  <span>.</span>
                  <span>{formatarDataExibicao(item.data)}</span>
                </p>
              </div>

              <div className="flex justify-end w-1/2 items-center pl-4">
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
                {/* Botão de editar */}
                <button
                  className=" text-gray-500 pr-2 pl-4"
                  onClick={() => onEditTransaction(item)}
                >
                  <PencilIcon size={16} />
                </button>
                {/* Botão de deletar */}
                <button
                  onClick={() => onDeleteTransactionClick(item.id)}
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

export default History;
