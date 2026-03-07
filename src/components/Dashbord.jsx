import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

function Dashbord({ transactions, transacoesFiltradas, nomeMes }) {
  const receitas = transacoesFiltradas.filter(
    (t) => t.tipo === "receita",
  ).length;
  const despesas = transacoesFiltradas.filter(
    (t) => t.tipo === "despesa",
  ).length;

  // 1. Saldo Total (considerando TUDO, ignorando o mês)
  const saldoTotal = transactions.reduce((acc, t) => {
    return t.tipo === "receita" ? acc + Number(t.valor) : acc - Number(t.valor);
  }, 0);

  // 2. Entradas do Mês (usando apenas o que foi filtrado)
  const entradasMes = transacoesFiltradas
    .filter((t) => t.tipo === "receita")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  // 3. Saídas do Mês
  const saidasMes = transacoesFiltradas
    .filter((t) => t.tipo === "despesa")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-44 gap-4 px-4">
      {/* Saldo total   */}
      <div className="flex flex-col border border-gray-300 w-full md:w-1/3 h-4/5 rounded-2xl bg-white">
        {/* Topo do card */}
        <div className="flex w-full h-1/2 ">
          <span className="flex w-1/2 p-6 text-slate-500 ">Saldo Total</span>
          {/* Icon de maleta */}
          <span className="flex w-1/2 justify-end p-6">
            <div className="flex items-center size-10 p-2 bg-cyan-100 rounded-full">
              <Wallet size={24} className="text-cyan-400" />
            </div>
          </span>
        </div>
        {/* Resto do card */}
        {/* Resto do card */}
        <div className="flex flex-col w-full h-1/2 gap-1">
          {/* A classe muda dinamicamente entre text-cyan-400 e text-red-500 */}
          <span
            className={`px-6 text-2xl ${saldoTotal < 0 ? "text-red-500" : "text-cyan-400"}`}
          >
            {formatarMoeda(saldoTotal)}
          </span>
          <span className="px-6 pb-2 text-xs text-gray-500">
            Todas as transações
          </span>
        </div>
      </div>

      {/* Entradas */}
      <div className="flex flex-col border border-gray-300 w-full md:w-1/3 h-4/5 rounded-2xl bg-white">
        {/* Topo do card */}
        <div className="flex w-full h-1/2 ">
          <span className="flex w-1/2 p-6 text-slate-500 ">
            Entradas - {nomeMes}
          </span>

          <span className="flex w-1/2 justify-end p-6">
            <div className="flex items-center size-10 p-2 bg-green-100 rounded-full">
              <TrendingUp size={24} className="text-green-500" />
            </div>
          </span>
        </div>
        {/* Resto do card */}
        <div className="flex flex-col w-full h-1/2 gap-1">
          <span className="px-6 text-2xl text-green-500">
            {formatarMoeda(entradasMes)}
          </span>
          <span className="px-6 text-xs pb-2 text-gray-500">
            {receitas} receitas
          </span>
        </div>
      </div>

      {/* Saida */}
      <div className="flex flex-col border border-gray-300 w-full md:w-1/3 h-4/5 rounded-2xl bg-white">
        {/* Topo do card */}
        <div className="flex w-full h-1/2 ">
          <span className="flex w-1/2 p-6 text-slate-500 ">
            Saídas - {nomeMes}
          </span>
          <span className="flex w-1/2 justify-end p-6">
            <div className="flex items-center size-10 p-2 bg-red-100 rounded-full">
              <TrendingDown size={24} className="text-red-500" />
            </div>
          </span>
        </div>
        {/* Resto do card */}
        <div className="flex flex-col w-full h-1/2 gap-1">
          <span className="px-6 text-2xl text-red-500">
            {formatarMoeda(saidasMes)}
          </span>
          <span className="px-6 text-xs pb-2 text-gray-500">
            {despesas} despesas
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
