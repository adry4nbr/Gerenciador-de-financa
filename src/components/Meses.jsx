function Meses({ mesAtivo, setMesAtivo, listaMeses }) {
  return (
    <div className="w-full px-4">
      <div className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide py-4 gap-4 md:gap-10 justify-start">
        {listaMeses.map((mes, index) => (
          <div
            key={mes}
            onClick={() => setMesAtivo(index)} // AQUI: Muda o mês no App.jsx
            className={`px-4 py-1 rounded-full cursor-pointer transition-colors border
              ${
                mesAtivo === index
                  ? "bg-cyan-500 text-white border-cyan-600" // Estilo Ativo
                  : "bg-white text-gray-700 border-gray-500 hover:bg-gray-100" // Estilo Inativo
              }`}
          >
            {mes}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meses;
