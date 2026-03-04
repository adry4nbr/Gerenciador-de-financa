import { useState } from "react";

function AddTransaction() {
  const [tipo, setTipo] = useState("receita");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="size-full flex justify-end items-center gap-4">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-cyan-400 rounded-2xl px-4 py-2 text-white font-bold hover:bg-blue-500 transition-colors"
      >
        Nova Transação
      </button>

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
              Nova Transação
            </h1>

            {/*Botões de Receita e Despesa  */}
            <div className="m-4 flex justify-center items-center">
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
              <input
                type="text"
                name="Nome"
                id=""
                placeholder="Ex: Pedido no Ifood"
                className="rounded-3xl border border-gray-200 py-2 px-4 bg-slate-100 mb-3 text-slate-800"
              />

              <label htmlFor="Valor">Valor</label>
              <input
                type="number"
                name="Valor"
                id=""
                placeholder="0"
                className="rounded-3xl border border-gray-200 py-2 px-4 bg-slate-100 mb-3 text-slate-800"
              />

              <label htmlFor="Categoria">Categoria</label>
              <input
                type="text"
                name="Categoria"
                id=""
                placeholder="Ex: Alimentação"
                className="rounded-3xl border border-gray-200 py-2 px-4 bg-slate-100 mb-3 text-slate-800"
              />

              <label htmlFor="Data">Data</label>
              <input
                type="date"
                name="Data"
                id=""
                className="rounded-3xl border border-gray-200 py-2 px-4 bg-slate-100 text-slate-900"
              />
            </div>

            <div className="flex w-full justify-center">
              <button
                className={`flex text-white rounded-xl py-2 px-18 my-6 border border-gray-200 justify-center ${
                  tipo === "receita"
                    ? "bg-green-500 border-green-600"
                    : "bg-red-500 border-red-600"
                }`}
              >
                Adicionar Transação
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
