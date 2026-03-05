function History({ transactions = [] }) {
  const formatarDataExibicao = (dataISO) => {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="flex flex-col w-3/5 min-h-44 max-h-95 my-4 md:my-0 mx-4 rounded-2xl border border-slate-300 bg-white">
      <header className="flex w-full h-12 items-center p-4  ">
        <h2 className="w-4/5">Historico - Mês </h2>
        <p className="flex w-1/5 justify-end text-xs text-gray-500">
          {transactions.length} Transações
        </p>
      </header>

      {/* aqui onde vai ficar as transações */}
      <main className="flex size-full ">
        {/* overflow e scrollbar-thin para fazer a rolagem vertical*/}
        <ul className="flex overflow-y-auto size-full p-4 flex-col gap-2 scrollbar-thin max-h-70">
          {transactions.map((item) => (
            <li
              key={item.id}
              className="flex size-full h-16 p-4 border border-gray-200 rounded-xl "
            >
              <div className="flex flex-col justify-center w-1/2">
                <h3>{item.nome}</h3>
                <p className="flex text-xs text-gray-500 gap-1">
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
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default History;
