// Objeto que armazena as categorias e suas respectivas cores
// A chave é o nome da categoria e o valor é a classe do Tailwind que define a cor
const CATEGORY_COLORS = {
  alimentação: "bg-red-500", // Categoria alimentação terá fundo vermelho
  transporte: "bg-cyan-400", // Categoria transporte terá fundo azul claro
  lazer: "bg-pink-400", // Categoria lazer terá fundo rosa
  salário: "bg-blue-400", // Categoria salário terá fundo azul
  moradia: "bg-orange-400", // Categoria moradia terá fundo laranja
  educação: "bg-purple-400", // Categoria educação terá fundo roxo
  saúde: "bg-green-400", // Categoria saúde terá fundo verde
  compras: "bg-yellow-400", // Categoria compras terá fundo amarelo
};

// Função exportada que retorna a cor correspondente da categoria
// Ela recebe o nome da categoria como parâmetro
export const getCategoryColor = (categoria) => {
  // Se a categoria não existir ou estiver vazia
  // retorna uma cor padrão (cinza)
  if (!categoria) return "bg-gray-400";

  // Normaliza o texto da categoria:
  // toLowerCase() -> transforma tudo em minúsculo
  // trim() -> remove espaços extras no começo ou no final
  const normalized = categoria.toLowerCase().trim();

  // Procura a categoria dentro do objeto CATEGORY_COLORS
  // Se existir retorna a cor correspondente
  // Se não existir retorna a cor padrão (cinza)
  return CATEGORY_COLORS[normalized] || "bg-gray-400";
};
