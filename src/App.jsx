// import { useState } from "react";
import AddTransaction from "./components/AddTransaction";
import Title from "./components/Title";

function App() {
  return (
    <div className="w-full min-h-screen  flex flex-col">
      <header className="w-full h-18 flex items-center justify-between px-6 border-b border-gray-500">
        <Title>Gerenciador de Finanças</Title>
        <AddTransaction></AddTransaction>
      </header>

      <nav className="w-full h-22 "></nav>

      <main>
        <section className="w-full h-44 "></section>

        <section className="w-full min-h-44 b"></section>
      </main>

      <footer className="w-full h-22"></footer>
    </div>
  );
}

export default App;
