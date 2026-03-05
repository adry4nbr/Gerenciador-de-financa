import { useState } from "react";
import AddTransaction from "./components/AddTransaction";
import Title from "./components/Title";
import History from "./components/History";
import Dashbord from "./components/Dashbord";
import Meses from "./components/Meses";

function App() {
  const [transaction, setTransaction] = useState([
    {
      id: "teste-123",
      nome: "Teste-1",
      valor: "250",
      tipo: "receita",
      categoria: "Teste",
      data: "2025-09-22",
    },
    {
      id: "teste-2",
      nome: "Teste2",
      valor: "550",
      tipo: "despesa",
      categoria: "Teste",
      data: "2025-09-22",
    },
    {
      id: "teste-3",
      nome: "Teste3",
      valor: "350",
      tipo: "receita",
      categoria: "Teste",
      data: "2025-09-22",
    },
    {
      id: "teste-4",
      nome: "Teste4",
      valor: "750",
      tipo: "receita",
      categoria: "Teste",
      data: "2025-09-22",
    },
    {
      id: "teste-5",
      nome: "Teste-5",
      valor: "150",
      tipo: "despesa",
      categoria: "Teste",
      data: "2025-09-22",
    },
  ]);

  const adicionarTransaction = (nova) => {
    setTransaction([nova, ...transaction]);
  };

  return (
    <div className="w-full min-h-screen  flex flex-col bg-gray-100">
      <header className="w-full h-18 flex items-center justify-between px-6 border-b border-gray-300 bg-white">
        <Title>Gerenciador de Finanças</Title>
        <AddTransaction onAdd={adicionarTransaction} />
      </header>

      <nav>
        <Meses />
      </nav>

      <main>
        <Dashbord transactions={transaction} />

        <section className="flex w-full max-h-95">
          <div className="w-2/5"></div>
          <History transactions={transaction} />
        </section>
      </main>

      <footer className="w-full h-22"></footer>
    </div>
  );
}

export default App;
