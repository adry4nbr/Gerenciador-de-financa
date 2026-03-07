import { useState, useEffect } from "react";
import AddTransaction from "./components/AddTransaction";
import Title from "./components/Title";
import History from "./components/History";
import Dashbord from "./components/Dashbord";
import Meses from "./components/Meses";
import Grafic from "./components/Grafic";
import Links from "./components/Links";

function App() {
  const [transaction, setTransaction] = useState(() => {
    const salvas = localStorage.getItem("minhas-transacoes");
    return salvas ? JSON.parse(salvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("minhas-transacoes", JSON.stringify(transaction));
  }, [transaction]);

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

  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. Este efeito garante que o HTML e o Estado estejam SEMPRE iguais
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]); // Sempre que isDarkMode mudar, ele atualiza o HTML

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="w-full min-h-screen  flex flex-col bg-gray-100 dark:bg-slate-900">
      <header className="w-full h-18 flex items-center justify-between px-6 border-b border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800">
        <Title>Gerenciador de Finanças</Title>
        <AddTransaction
          key={`${editTransaction?.id || "novo"}-${refreshKey}`}
          onAdd={adicionarTransaction}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
          onUpdate={updateTransaction}
          isDarkMode={isDarkMode}
          toggleTheme={toggleDarkMode}
        />
      </header>

      <nav>
        <Meses
          mesAtivo={mesAtivo}
          setMesAtivo={setMesAtivo}
          listaMeses={LISTA_MESES}
        />
      </nav>

      <main className="grow">
        <Dashbord
          transacoesFiltradas={transacoesFiltradas}
          transactions={transaction}
          nomeMes={LISTA_MESES[mesAtivo]}
        />

        <section className="flex flex-col px-4 md:px-0 md:flex-row w-full">
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

      <footer>
        <Links />
      </footer>
    </div>
  );
}

export default App;
