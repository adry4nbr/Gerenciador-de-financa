/* eslint-disable react-hooks/static-components */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getCategoryColor } from "./CategoryColors";

function Grafic({ nomeMes, transactions = [] }) {
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

  // 1. Processa os dados aqui dentro do componente
  const dadosProcessados = transactions
    .filter((t) => t.tipo === "despesa")
    .reduce((acc, t) => {
      const categoriaExistente = acc.find((item) => item.name === t.categoria);

      // Pega a classe (ex: "bg-red-500") e converte para hex (ex: "#ef4444")
      const tailwindClass = getCategoryColor(t.categoria);
      const hexColor = COLOR_MAP[tailwindClass] || "#9ca3af";

      if (categoriaExistente) {
        categoriaExistente.value += Number(t.valor);
      } else {
        acc.push({
          name: t.categoria,
          value: Number(t.valor),
          color: hexColor, // Agora enviamos a cor real
        });
      }
      return acc;
    }, []);

  // Configuração do balão das categorias
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex bg-white dark:bg-slate-800 border  border-gray-200  p-3 rounded-2xl shadow-lg text-sm gap-1">
          <p className="font-bold">{payload[0].name} :</p>
          <p className="text-red-500">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (dadosProcessados.length === 0) {
    return (
      <div className="flex flex-col w-full md:w-2/5 min-h-44 my-4 md:my-0 md:mr-2 md:ml-4 rounded-2xl border gap-12 dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-800 p-4 items-center">
        <h2 className="w-full font-medium dark:text-white">
          Gastos por Categoria - {nomeMes}
        </h2>
        <p className="text-gray-400 ">Nenhuma despesa este mês.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full md:w-2/5 md:min-h-44 min-h-85 my-4 md:my-0 md:mr-2 md:ml-4 rounded-2xl border dark:border-slate-700 border-slate-300 bg-white dark:bg-slate-800">
      <h2 className="p-4 font-medium dark:text-white">
        Gastos por Categoria - {nomeMes}
      </h2>

      <ResponsiveContainer width="100%" height={230}>
        <PieChart>
          <Pie
            data={dadosProcessados} // O Recharts precisa desta prop "data"
            dataKey="value" // Precisa dizer qual é o número
            nameKey="name" // Precisa dizer qual é o nome
            innerRadius={60}
            outerRadius={95}
            paddingAngle={4}
          >
            {dadosProcessados.map((entry, index) => (
              // Ajuste: A função getCategoryColor retorna uma classe tailwind (ex: "bg-red-500")
              // O Recharts precisa de uma cor HEX ou nome (ex: "#ef4444").
              // Se sua função retorna classe, o 'fill' pode não reconhecer.
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legenda Dinâmica */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 px-6 pb-6 text-sm">
        {dadosProcessados.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Retângulo da cor */}
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

export default Grafic;
