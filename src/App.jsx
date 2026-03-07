import { useState } from "react";
import AddTransaction from "./components/AddTransaction";
import Title from "./components/Title";
import History from "./components/History";
import Dashbord from "./components/Dashbord";
import Meses from "./components/Meses";
import Grafic from "./components/Grafic";

function App() {
  const [transaction, setTransaction] = useState([
    {
      id: "teste-123",
      nome: "Teste-1",
      valor: "250",
      tipo: "despesa",
      categoria: "Salário",
      data: "2025-03-22",
    },
    {
      id: "teste-2",
      nome: "Teste2",
      valor: "550",
      tipo: "despesa",
      categoria: "Alimentação",
      data: "2025-03-22",
    },
    {
      id: "teste-3",
      nome: "Teste3",
      valor: "350",
      tipo: "despesa",
      categoria: "Transporte",
      data: "2025-03-22",
    },
    {
      id: "teste-4",
      nome: "Teste4",
      valor: "750",
      tipo: "despesa",
      categoria: "Moradia",
      data: "2025-03-22",
    },
    {
      id: "teste-5",
      nome: "Teste-5",
      valor: "150",
      tipo: "despesa",
      categoria: "Educação",
      data: "2025-03-22",
    },
  ]);

  const adicionarTransaction = (nova) => {
    setTransaction([nova, ...transaction]);
  };

  const [editTransaction, setEditTransaction] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function onEditTransaction(transaction) {
    setEditTransaction(transaction);
    setRefreshKey((prev) => prev + 1); // Incrementa para forçar o re-render
  }
  //  Função para ATUALIZAR (a nova lógica)
  const updateTransaction = (transacaoAtualizada) => {
    setTransaction(
      transaction.map((t) =>
        t.id === transacaoAtualizada.id ? transacaoAtualizada : t,
      ),
    );
    setEditTransaction(null); // Limpa o estado após salvar
  };
  // Função para DELETAR
  function onDeleteTransactionClick(transactionId) {
    const newTransactions = transaction.filter((t) => t.id !== transactionId);
    setTransaction(newTransactions);
  }

  const [mesAtivo, setMesAtivo] = useState(new Date().getMonth());

  // Filtro automático baseado no mês ativo
  const transacoesFiltradas = transaction.filter((t) => {
    const mesDaTransacao = new Date(t.data).getMonth();
    return mesDaTransacao === mesAtivo;
  });

  const LISTA_MESES = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <div className="w-full min-h-screen  flex flex-col bg-gray-100">
      <header className="w-full h-18 flex items-center justify-between px-6 border-b border-gray-300 bg-white">
        <Title>Gerenciador de Finanças</Title>
        <AddTransaction
          key={`${editTransaction?.id || "novo"}-${refreshKey}`}
          onAdd={adicionarTransaction}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
          onUpdate={updateTransaction}
        />
      </header>

      <nav>
        <Meses
          mesAtivo={mesAtivo}
          setMesAtivo={setMesAtivo}
          listaMeses={LISTA_MESES}
        />
      </nav>

      <main>
        <Dashbord
          transacoesFiltradas={transacoesFiltradas}
          transactions={transaction}
          nomeMes={LISTA_MESES[mesAtivo]}
        />

        <section className="flex flex-col px-4 md:px-0 md:flex-row w-full max-h-95">
          <Grafic
            transactions={transacoesFiltradas || []}
            nomeMes={LISTA_MESES[mesAtivo]}
          />
          {/* Historio=co de transação */}
          <History
            transactions={transacoesFiltradas} // Somente o mês selecionado
            onEditTransaction={onEditTransaction}
            onDeleteTransactionClick={onDeleteTransactionClick}
            nomeMes={LISTA_MESES[mesAtivo]}
          />
        </section>
      </main>

      <footer className="w-full h-14"></footer>
    </div>
  );
}

export default App;
