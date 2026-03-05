function Meses() {
  const listaMeses = [
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
    // O w-full garante que ele ocupe a largura da tela
    <div className="w-full px-4">
      {/* Aqui aplicamos o scroll no contêiner interno */}
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide py-4 gap-4 md:gap-10 justify-start md:justify-center">
        {listaMeses.map((mes) => (
          <div
            key={mes}
            className="border border-gray-500 bg-white px-4 py-1 rounded-full shrink-0 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {mes}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meses;
