// Importa os hooks do React para gerenciar estado e efeitos
import { useState, useEffect } from "react";

// Importa os componentes usados dentro do App
import AddTransaction from "./components/AddTransaction";
import Title from "./components/Title";
import History from "./components/History";
import Dashbord from "./components/Dashbord";
import Meses from "./components/Meses";
import Grafic from "./components/Grafic";
import Links from "./components/Links";

function App() {
  // Estado principal que guarda todas as transações
  // A função dentro do useState roda apenas na primeira renderização
  // Ela tenta pegar dados salvos no localStorage
  const [transaction, setTransaction] = useState(() => {
    const salvas = localStorage.getItem("minhas-transacoes");
    return salvas ? JSON.parse(salvas) : [];
  });

  // Sempre que "transaction" mudar, salva novamente no localStorage
  useEffect(() => {
    localStorage.setItem("minhas-transacoes", JSON.stringify(transaction));
  }, [transaction]);

  // Função para adicionar uma nova transação
  // Ela coloca a nova transação no começo da lista
  const adicionarTransaction = (nova) => {
    setTransaction([nova, ...transaction]);
  };

  // Estado que guarda a transação que está sendo editada
  const [editTransaction, setEditTransaction] = useState(null);

  // Estado usado para forçar re-render de componentes
  const [refreshKey, setRefreshKey] = useState(0);

  // Função chamada quando o usuário clica para editar uma transação
  function onEditTransaction(transaction) {
    setEditTransaction(transaction);

    // Incrementa a chave para forçar atualização do componente
    setRefreshKey((prev) => prev + 1);
  }

  // Função para ATUALIZAR uma transação existente
  const updateTransaction = (transacaoAtualizada) => {
    setTransaction(
      transaction.map((t) =>
        // Se encontrar a transação com o mesmo ID, substitui
        t.id === transacaoAtualizada.id ? transacaoAtualizada : t,
      ),
    );

    // Limpa o estado de edição depois de salvar
    setEditTransaction(null);
  };

  // Função para DELETAR uma transação
  function onDeleteTransactionClick(transactionId) {
    // Filtra todas as transações que NÃO possuem o ID deletado
    const newTransactions = transaction.filter((t) => t.id !== transactionId);

    // Atualiza o estado com a nova lista
    setTransaction(newTransactions);
  }

  // Estado que guarda qual mês está selecionado
  const [mesAtivo, setMesAtivo] = useState(new Date().getMonth());

  // Filtra automaticamente as transações baseado no mês ativo
  const transacoesFiltradas = transaction.filter((t) => {
    const mesDaTransacao = new Date(t.data).getMonth();
    return mesDaTransacao === mesAtivo;
  });

  // Lista fixa com todos os meses do ano
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

  // Estado que controla se o modo escuro está ativo
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Esse efeito mantém o HTML sincronizado com o estado dark mode
  useEffect(() => {
    // Se dark mode estiver ativo, adiciona a classe "dark"
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      // Caso contrário remove a classe
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]); // Executa sempre que o estado mudar

  // Função que alterna entre modo claro e escuro
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    // Container principal da aplicação
    <div className="w-full min-h-screen  flex flex-col bg-gray-100 dark:bg-slate-900">
      {/* Cabeçalho da aplicação */}
      <header className="w-full h-18 flex items-center justify-between px-6 border-b border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800">
        {/* Título da aplicação */}
        <Title>Gerenciador de Finanças</Title>

        {/* Componente responsável por adicionar ou editar transações */}
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

      {/* Menu de seleção de meses */}
      <nav>
        <Meses
          mesAtivo={mesAtivo}
          setMesAtivo={setMesAtivo}
          listaMeses={LISTA_MESES}
        />
      </nav>

      {/* Conteúdo principal da aplicação */}
      <main className="grow">
        {/* Dashboard com resumo financeiro */}
        <Dashbord
          transacoesFiltradas={transacoesFiltradas}
          transactions={transaction}
          nomeMes={LISTA_MESES[mesAtivo]}
        />

        {/* Área com gráfico e histórico */}
        <section className="flex flex-col px-4 md:px-0 md:flex-row w-full">
          {/* Gráfico das transações */}
          <Grafic
            transactions={transacoesFiltradas || []}
            nomeMes={LISTA_MESES[mesAtivo]}
          />

          {/* Histórico de transações */}
          <History
            transactions={transacoesFiltradas} // Mostra somente o mês selecionado
            onEditTransaction={onEditTransaction}
            onDeleteTransactionClick={onDeleteTransactionClick}
            nomeMes={LISTA_MESES[mesAtivo]}
          />
        </section>
      </main>

      {/* Rodapé da aplicação */}
      <footer>
        <Links />
      </footer>
    </div>
  );
}

// Exporta o componente principal da aplicação
export default App;
