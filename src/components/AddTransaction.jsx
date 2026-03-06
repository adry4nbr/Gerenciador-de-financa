import { useState, useEffect } from "react";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";

function AddTransaction({
  onAdd,
  editTransaction,
  setEditTransaction,
  onUpdate,
}) {
  const [tipo, setTipo] = useState("receita");
  const [isOpen, setIsOpen] = useState(false);

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (editTransaction) {
      setNome(editTransaction.nome);
      setValor(editTransaction.valor);
      setCategoria(editTransaction.categoria);
      setData(editTransaction.data);
      setTipo(editTransaction.tipo);
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTransaction]);

  // Função para fechar e limpar
  const handleClose = () => {
    setIsOpen(false);
    setEditTransaction(null); // Limpa quem estava editando
    setNome("");
    setValor(""); // Limpa os campos
  };

  const handleSubmit = () => {
    if (
      !nome.trim() ||
      Number(valor) <= 0 ||
      !categoria.trim() ||
      !data.trim()
    ) {
      return alert("Preencha todos os campos");
    }

    const transacaoDados = {
      id: editTransaction ? editTransaction.id : uuidv4(), // Mantém o ID se estiver editando
      nome,
      valor,
      categoria: categoria.trim().toLocaleLowerCase(),
      data,
      tipo,
    };

    if (editTransaction) {
      onUpdate(transacaoDados); // Chama a função que atualiza a lista no App
    } else {
      onAdd(transacaoDados); // Chama a função que adiciona um novo
    }

    handleClose();
  };

  return (
    <div className="size-full flex justify-end items-center gap-4 ">
      {/* botão para criar uma nova transação */}
      <button
        onClick={() => {
          setEditTransaction(null);
          setNome("");
          setValor("");
          setCategoria("");
          setTipo("receita");
          setData(new Date().toISOString().split("T")[0]);
          setIsOpen(true); // Abre o modal à força!
        }}
        className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-600 transition-all text-white text-sm font-bold px-3 py-2 rounded-2xl shadow-lg"
      >
        <div className="flex items-center justify-center size-4 rounded-full border-2 border-white">
          <Plus size={20} strokeWidth={3} />
        </div>
        <span className="hidden md:inline text-sm">Nova Transação</span>
      </button>

      {/* Quando ele abrir */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fundo Borrado */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Card do Formulário */}
          <div className="relative w-125 bg-white rounded-2xl justify-center items-center">
            <h1 className="p-4 font-bold border-b border-gray-200 flex justify-center text-xl">
              {editTransaction ? "Editar Transação" : "Nova Transação"}
            </h1>

            {/*Botões de Receita e Despesa  */}
            <div className="m-4 flex justify-center items-center">
              {/* botão de receita */}
              <button
                onClick={() => setTipo("receita")}
                className={`py-2 px-14 flex justify-center rounded-l-3xl items-center border border-gray-200 text-slate-600 ${
                  tipo === "receita"
                    ? "bg-green-500 text-white border-green-600"
                    : "bg-white text-slate-600 border-gray-200 hover:bg-gray-300"
                }`}
              >
                Receita
              </button>
              {/* botão de despesa */}
              <button
                onClick={() => setTipo("despesa")}
                className={`py-2 px-14 flex justify-center rounded-r-3xl items-center border border-gray-200 text-slate-600 ${
                  tipo === "despesa"
                    ? "bg-red-500 text-white border-red-600"
                    : "bg-white text-slate-600 border-gray-200 hover:bg-gray-300"
                }`}
              >
                Despesa
              </button>
            </div>

            {/* Inputs */}
            <div className="flex flex-col px-6">
              <label htmlFor="Nome">Nome</label>
              <Input
                type="text"
                name="Nome"
                placeholder="Ex: Pedido no Ifood"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />

              <label htmlFor="Valor">Valor</label>
              <Input
                type="number"
                name="Valor"
                placeholder="0"
                value={valor}
                onChange={(event) => setValor(event.target.value)}
              />

              <label htmlFor="Categoria">Categoria</label>
              <Input
                type="text"
                name="Categoria"
                placeholder="Ex: Alimentação"
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}
              />

              <label htmlFor="Data">Data</label>
              <input
                type="date"
                name="Data"
                className="rounded-3xl border border-gray-200 py-2 px-4 bg-slate-100 text-slate-900"
                value={data}
                onChange={(event) => setData(event.target.value)}
              />
            </div>

            {/*Local onde está o botão de adicionar  */}
            <div className="flex w-full justify-center">
              {/* botão de adicionar */}
              <button
                className={`flex text-white rounded-xl py-2 px-18 my-6 border border-gray-200 justify-center ${
                  tipo === "receita" ? "bg-green-500" : "bg-red-500"
                }`}
                onClick={handleSubmit} // AQUI: Usamos a nova função que trata os dois casos
              >
                {editTransaction ? "Salvar Alterações" : "Adicionar Transação"}
              </button>
            </div>
          </div>
        </div>
      )}
      <button>Dark Mode</button>
    </div>
  );
}

export default AddTransaction;
