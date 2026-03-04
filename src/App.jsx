import { useState } from "react";
import AddTransaction from "./components/AddTransaction";
import Title from "./components/Title";
import History from "./components/History";

function App() {
  const [transaction, setTransaction] = useState([
    {
      id: "teste-123",
      nome: "Teste",
      valor: "250",
      tipo: "receita",
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

      <nav className="w-full h-22 "></nav>

      <main className="">
        <section className="w-full h-44 bg-amber-300 "></section>

        <section className="flex w-full max-h-95">
          <div className="bg-amber-700 w-2/5"></div>
          <History transactions={transaction} />
        </section>
      </main>

      <footer className="w-full h-22"></footer>
    </div>
  );
}

export default App;
