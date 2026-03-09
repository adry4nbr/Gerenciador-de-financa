import { useState, useEffect } from "react"; // Hooks do React para estado e efeitos colaterais
import Input from "./Input"; // Componente de input personalizado
import { v4 as uuidv4 } from "uuid"; // Biblioteca para gerar IDs únicos
import { Plus } from "lucide-react"; // Ícone de "+" da biblioteca lucide-react
import DarkMode from "./DarkMode"; // Componente responsável por alternar modo claro/escuro

function AddTransaction({
  onAdd, // Função recebida do componente pai para adicionar uma nova transação
  editTransaction, // Objeto da transação que está sendo editada
  setEditTransaction, // Função para definir qual transação está sendo editada
  onUpdate, // Função recebida do pai para atualizar uma transação existente
  isDarkMode, // Estado que indica se o modo escuro está ativado
  toggleTheme, // Função para alternar entre modo claro e escuro
}) {
  // Estado que define se a transação é receita ou despesa
  const [tipo, setTipo] = useState("receita");

  // Estado que controla se o modal está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  // Estados dos campos do formulário
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");

  // Define a data inicial como o dia atual
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);

  // useEffect executa quando editTransaction muda
  useEffect(() => {
    if (editTransaction) {
      // Preenche os campos com os dados da transação que está sendo editada
      setNome(editTransaction.nome);
      setValor(editTransaction.valor);
      setCategoria(editTransaction.categoria);
      setData(editTransaction.data);
      setTipo(editTransaction.tipo);

      // Abre o modal automaticamente quando uma transação é selecionada para edição
      setIsOpen(true);
    }

    /// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTransaction]);

  // Função responsável por fechar o modal e limpar os campos
  const handleClose = () => {
    setIsOpen(false); // fecha o modal
    setEditTransaction(null); // limpa a transação que estava sendo editada
    setNome("");
    setValor(""); // limpa os campos do formulário
  };

  // Função chamada quando o usuário clica em "Adicionar" ou "Salvar"
  const handleSubmit = () => {
    // Validação dos campos
    if (
      !nome.trim() ||
      Number(valor) <= 0 ||
      !categoria.trim() ||
      !data.trim()
    ) {
      return alert("Preencha todos os campos");
    }

    // Cria o objeto com os dados da transação
    const transacaoDados = {
      // Se estiver editando mantém o ID original, se não cria um novo
      id: editTransaction ? editTransaction.id : uuidv4(),
      nome,
      valor,
      // Remove espaços e transforma categoria em minúsculo
      categoria: categoria.trim().toLocaleLowerCase(),
      data,
      tipo,
    };

    // Se existe uma transação sendo editada chama a função de update
    if (editTransaction) {
      onUpdate(transacaoDados);
    }
    // Caso contrário adiciona uma nova transação
    else {
      onAdd(transacaoDados);
    }
    // Fecha o modal e limpa o formulário
    handleClose();
  };

  return (
    // Container principal com flexbox
    <div className="size-full flex justify-end items-center gap-4 ">
      {/* Botão para abrir o modal de nova transação */}
      <button
        onClick={() => {
          // Limpa possíveis dados anteriores
          setEditTransaction(null);
          setNome("");
          setValor("");
          setCategoria("");
          setTipo("receita");
          // Define a data como hoje
          setData(new Date().toISOString().split("T")[0]);
          // Abre o modal
          setIsOpen(true);
        }}
        className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-600 transition-all text-white text-sm font-bold px-3 py-2 rounded-2xl shadow-lg"
      >
        {/* Ícone de "+" */}
        <div className="flex items-center justify-center size-4 rounded-full border-2 border-white">
          <Plus size={20} strokeWidth={3} />
        </div>

        {/* Texto do botão (escondido em telas pequenas) */}
        <span className="hidden md:inline text-sm">Nova Transação</span>
      </button>

      {/* Renderiza o modal somente se isOpen for true */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fundo escuro com blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)} // fecha o modal ao clicar fora
          ></div>

          {/* Card que contém o formulário */}
          <div className="relative w-125 bg-white dark:bg-slate-800 rounded-2xl justify-center items-center">
            {/* Título do modal */}
            <h1 className="p-4 font-bold border-b border-gray-200 dark:border-slate-700 dark:text-white flex justify-center text-xl">
              {editTransaction ? "Editar Transação" : "Nova Transação"}
            </h1>

            {/* Botões para selecionar Receita ou Despesa */}
            <div className="m-4 flex justify-center items-center">
              {/* Botão Receita */}
              <button
                onClick={() => setTipo("receita")}
                className={`py-2 px-14 flex justify-center rounded-l-3xl items-center border border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 ${
                  tipo === "receita"
                    ? "bg-green-500 text-white dark:text-white border-green-600"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:bg-gray-300"
                }`}
              >
                Receita
              </button>

              {/* Botão Despesa */}
              <button
                onClick={() => setTipo("despesa")}
                className={`py-2 px-14 flex justify-center rounded-r-3xl items-center border border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 ${
                  tipo === "despesa"
                    ? "bg-red-500 text-white dark:text-white border-red-600"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:bg-gray-300"
                }`}
              >
                Despesa
              </button>
            </div>

            {/* Área dos inputs */}
            <div className="flex flex-col px-6 dark:text-gray-300">
              {/* Input Nome */}
              <label htmlFor="Nome">Nome:</label>
              <Input
                type="text"
                name="Nome"
                placeholder="Ex: Pedido no Ifood"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />

              {/* Input Valor */}
              <label htmlFor="Valor">Valor:</label>
              <Input
                type="number"
                name="Valor"
                placeholder="0"
                value={valor}
                onChange={(event) => setValor(event.target.value)}
              />

              {/* Input Categoria */}
              <label htmlFor="Categoria">Categoria:</label>
              <Input
                type="text"
                name="Categoria"
                placeholder="Ex: Alimentação"
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}
              />

              {/* Input Data */}
              <label htmlFor="Data">Data:</label>
              <input
                type="date"
                name="Data"
                className="rounded-3xl border border-gray-200 dark:border-slate-500 py-2 px-4 dark:bg-slate-700 bg-slate-100 text-slate-900 dark:text-slate-300"
                value={data}
                onChange={(event) => setData(event.target.value)}
              />
            </div>

            {/* Área do botão de ação */}
            <div className="flex w-full justify-center">
              {/* Botão que adiciona ou salva a transação */}
              <button
                className={`flex text-white rounded-xl py-2 px-18 my-6 border border-gray-200 dark:border-slate-700 justify-center ${
                  tipo === "receita" ? "bg-green-500" : "bg-red-500"
                }`}
                onClick={handleSubmit}
              >
                {editTransaction ? "Salvar Alterações" : "Adicionar Transação"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Componente que alterna o modo escuro */}
      <DarkMode isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} />
    </div>
  );
}

export default AddTransaction;
