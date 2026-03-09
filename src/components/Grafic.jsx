/* eslint-disable react-hooks/static-components */
// Desativa uma regra do ESLint que reclama de componentes criados dentro de outro componente

// Importa componentes da biblioteca Recharts para criar gráficos
// PieChart -> container do gráfico
// Pie -> formato de pizza
// Cell -> define a cor de cada fatia
// ResponsiveContainer -> faz o gráfico se adaptar ao tamanho da tela
// Tooltip -> balão que aparece ao passar o mouse no gráfico
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Importa função que retorna a cor da categoria baseada no nome
import { getCategoryColor } from "./CategoryColors";

// Componente Grafic
// Recebe:
// nomeMes -> nome do mês selecionado
// transactions -> lista de transações (por padrão array vazio)
function Grafic({ nomeMes, transactions = [] }) {
  // Mapa que converte classes do Tailwind para cores HEX
  // O Recharts não entende classes Tailwind (bg-red-500 etc)
  // Então precisamos converter para cor real (#ef4444 etc)
  const COLOR_MAP = {
    "bg-red-500": "#ef4444",
    "bg-cyan-400": "#22d3ee",
    "bg-pink-400": "#f472b6",
    "bg-blue-400": "#60a5fa",
    "bg-orange-400": "#fb923c",
    "bg-purple-400": "#c084fc",
    "bg-green-400": "#4ade80",
    "bg-yellow-400": "#facc15",
    "bg-gray-400": "#9ca3af",
  };

  // 1. Processamento dos dados para o gráfico
  // Aqui transformamos as transações em um formato que o Recharts entende
  const dadosProcessados = transactions

    // Filtra apenas as despesas (o gráfico mostra apenas gastos)
    .filter((t) => t.tipo === "despesa")

    // Agrupa os gastos por categoria
    .reduce((acc, t) => {
      // Verifica se já existe essa categoria no array
      const categoriaExistente = acc.find((item) => item.name === t.categoria);

      // Pega a classe Tailwind da categoria (ex: "bg-red-500")
      const tailwindClass = getCategoryColor(t.categoria);

      // Converte essa classe para cor HEX usando o mapa
      const hexColor = COLOR_MAP[tailwindClass] || "#9ca3af";

      // Se a categoria já existe no array, soma o valor
      if (categoriaExistente) {
        categoriaExistente.value += Number(t.valor);
      }
      // Se não existir, cria uma nova entrada no array
      else {
        acc.push({
          name: t.categoria, // nome da categoria
          value: Number(t.valor), // valor total gasto
          color: hexColor, // cor da fatia do gráfico
        });
      }

      return acc;
    }, []);

  // Componente personalizado do Tooltip (balão ao passar o mouse no gráfico)
  const CustomTooltip = ({ active, payload }) => {
    // Se o tooltip estiver ativo e tiver dados
    if (active && payload && payload.length) {
      return (
        // Caixa do tooltip
        <div className="flex bg-white dark:bg-slate-800 border border-gray-200 p-3 rounded-2xl shadow-lg text-sm gap-1">
          {/* Nome da categoria */}
          <p className="font-bold">{payload[0].name} :</p>

          {/* Valor formatado em moeda */}
          <p className="text-red-500">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(payload[0].value)}
          </p>
        </div>
      );
    }

    // Se não estiver ativo, não mostra nada
    return null;
  };

  // Se não existir nenhuma despesa no mês
  if (dadosProcessados.length === 0) {
    return (
      // Card informando que não há despesas
      <div className="flex flex-col w-full md:w-2/5 min-h-44 my-4 md:my-0 md:mr-2 md:ml-4 rounded-2xl border gap-12 dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-800 p-4 items-center">
        {/* Título */}
        <h2 className="w-full font-medium dark:text-white">
          Gastos por Categoria - {nomeMes}
        </h2>

        {/* Mensagem */}
        <p className="text-gray-400 ">Nenhuma despesa este mês.</p>
      </div>
    );
  }

  return (
    // Container principal do gráfico
    <div className="flex flex-col w-full md:w-2/5 md:min-h-44 min-h-85 my-4 md:my-0 md:mr-2 md:ml-4 rounded-2xl border dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-800">
      {/* Título */}
      <h2 className="p-4 font-medium dark:text-white">
        Gastos por Categoria - {nomeMes}
      </h2>

      {/* Container responsivo do gráfico */}
      <ResponsiveContainer width="100%" height={230}>
        {/* Estrutura do gráfico de pizza */}
        <PieChart>
          <Pie
            data={dadosProcessados} // Dados que serão usados no gráfico
            dataKey="value" // Qual propriedade contém o valor numérico
            nameKey="name" // Qual propriedade contém o nome da categoria
            innerRadius={60} // Raio interno (deixa o gráfico em formato donut)
            outerRadius={95} // Raio externo
            paddingAngle={4} // Espaço entre as fatias
          >
            {/* Cria cada fatia do gráfico */}
            {dadosProcessados.map((entry, index) => (
              // Cada fatia recebe a cor correspondente
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Tooltip personalizado */}
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legenda dinâmica das categorias */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 px-6 pb-6 text-sm">
        {dadosProcessados.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Quadradinho da cor da categoria */}
            <div
              className="size-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />

            {/* Nome da categoria */}
            <span className="text-gray-400 capitalize">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Exporta o componente para uso em outras partes do projeto
export default Grafic;
