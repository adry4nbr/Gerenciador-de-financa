// Importa os ícones da biblioteca lucide-react
// TrendingUp -> usado para indicar entradas/receitas
// TrendingDown -> usado para indicar saídas/despesas
// Wallet -> usado para representar o saldo total
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

// Componente Dashboard
// Recebe 3 props:
// transactions -> todas as transações do sistema
// transacoesFiltradas -> transações filtradas pelo mês selecionado
// nomeMes -> nome do mês que está sendo exibido no filtro
function Dashbord({ transactions, transacoesFiltradas, nomeMes }) {
  // Conta quantas transações de receita existem no mês filtrado
  const receitas = transacoesFiltradas.filter(
    (t) => t.tipo === "receita",
  ).length;

  // Conta quantas transações de despesa existem no mês filtrado
  const despesas = transacoesFiltradas.filter(
    (t) => t.tipo === "despesa",
  ).length;

  // 1. SALDO TOTAL
  // Calcula o saldo considerando TODAS as transações (ignorando o filtro de mês)
  // reduce percorre o array acumulando o resultado
  const saldoTotal = transactions.reduce((acc, t) => {
    // Se for receita soma
    // Se for despesa subtrai
    return t.tipo === "receita" ? acc + Number(t.valor) : acc - Number(t.valor);
  }, 0); // começa acumulando do zero

  // 2. ENTRADAS DO MÊS
  // Filtra apenas receitas do mês selecionado
  // Depois soma todos os valores
  const entradasMes = transacoesFiltradas
    .filter((t) => t.tipo === "receita")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  // 3. SAÍDAS DO MÊS
  // Filtra apenas despesas do mês
  // Depois soma todos os valores
  const saidasMes = transacoesFiltradas
    .filter((t) => t.tipo === "despesa")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  // Função responsável por formatar valores em moeda brasileira (R$)
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency", // formata como moeda
      currency: "BRL", // moeda brasileira
    }).format(valor);
  };

  return (
    // Container principal dos cards
    // flex-col em mobile e flex-row em telas maiores
    <div className="flex flex-col md:flex-row w-full h-auto md:h-44 gap-4 px-4">
      {/* CARD 1 - SALDO TOTAL */}
      <div className="flex flex-col border border-gray-300 dark:border-slate-700 w-full md:w-1/3 h-4/5 rounded-2xl bg-white dark:bg-slate-800">
        {/* Topo do card */}
        <div className="flex w-full h-1/2 ">
          {/* Texto do card */}
          <span className="flex w-1/2 p-6 text-slate-500 dark:text-slate-400">
            Saldo Total
          </span>

          {/* Ícone de carteira */}
          <span className="flex w-1/2 justify-end p-6">
            <div className="flex items-center size-10 p-2 dark:bg-cyan-900 bg-cyan-100 rounded-full">
              <Wallet size={24} className="text-cyan-400" />
            </div>
          </span>
        </div>

        {/* Parte inferior do card */}
        <div className="flex flex-col w-full h-1/2 gap-1">
          {/* Valor do saldo total */}
          {/* Se o saldo for negativo a cor fica vermelha */}
          {/* Se for positivo fica azul */}
          <span
            className={`px-6 text-2xl ${saldoTotal < 0 ? "text-red-500" : "text-cyan-400"}`}
          >
            {formatarMoeda(saldoTotal)}
          </span>

          {/* Texto auxiliar */}
          <span className="px-6 pb-2 text-xs text-gray-400">
            Todas as transações
          </span>
        </div>
      </div>

      {/* CARD 2 - ENTRADAS DO MÊS */}
      <div className="flex flex-col border border-gray-300 dark:border-slate-700 w-full md:w-1/3 h-4/5 rounded-2xl bg-white dark:bg-slate-800">
        {/* Topo do card */}
        <div className="flex w-full h-1/2 ">
          {/* Nome do card + mês selecionado */}
          <span className="flex w-1/2 p-6 text-slate-500 dark:text-slate-400 ">
            Entradas - {nomeMes}
          </span>

          {/* Ícone de crescimento (receita) */}
          <span className="flex w-1/2 justify-end p-6">
            <div className="flex items-center size-10 p-2 dark:bg-emerald-800 bg-green-100  rounded-full">
              <TrendingUp size={24} className="text-green-500 " />
            </div>
          </span>
        </div>

        {/* Parte inferior do card */}
        <div className="flex flex-col w-full h-1/2 gap-1">
          {/* Valor total de entradas do mês */}
          <span className="px-6 text-2xl text-green-500">
            {formatarMoeda(entradasMes)}
          </span>

          {/* Quantidade de receitas */}
          <span className="px-6 text-xs pb-2 text-gray-400">
            {receitas} receitas
          </span>
        </div>
      </div>

      {/* CARD 3 - SAÍDAS DO MÊS */}
      <div className="flex flex-col border border-gray-300 dark:border-slate-700 w-full md:w-1/3 h-4/5 rounded-2xl bg-white dark:bg-slate-800">
        {/* Topo do card */}
        <div className="flex w-full h-1/2 ">
          {/* Nome do card + mês */}
          <span className="flex w-1/2 p-6 text-slate-500 dark:text-slate-400 ">
            Saídas - {nomeMes}
          </span>

          {/* Ícone de queda (despesas) */}
          <span className="flex w-1/2 justify-end p-6">
            <div className="flex items-center size-10 p-2 dark:bg-rose-950 bg-red-100 rounded-full">
              <TrendingDown size={24} className="text-red-500" />
            </div>
          </span>
        </div>

        {/* Parte inferior do card */}
        <div className="flex flex-col w-full h-1/2 gap-1">
          {/* Valor total de despesas do mês */}
          <span className="px-6 text-2xl text-red-500">
            {formatarMoeda(saidasMes)}
          </span>

          {/* Quantidade de despesas */}
          <span className="px-6 text-xs pb-2 text-gray-400">
            {despesas} despesas
          </span>
        </div>
      </div>
    </div>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default Dashbord;
