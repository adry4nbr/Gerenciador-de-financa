const CATEGORY_COLORS = {
  alimentação: "bg-red-500",
  transporte: "bg-cyan-400",
  lazer: "bg-pink-400",
  salário: "bg-blue-400",
  moradia: "bg-orange-400",
  educação: "bg-purple-400",
  saúde: "bg-green-400",
  compras: "bg-yellow-400",
};

export const getCategoryColor = (categoria) => {
  if (!categoria) return "bg-gray-400";
  const normalized = categoria.toLowerCase().trim();
  return CATEGORY_COLORS[normalized] || "bg-gray-400";
};
