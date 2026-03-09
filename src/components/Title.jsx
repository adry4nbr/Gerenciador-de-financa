// Importa o ícone de carteira da biblioteca lucide-react
// Esse ícone será usado junto ao título da aplicação
import { Wallet } from "lucide-react";

// Componente Title
// Recebe "children" como propriedade
// children representa qualquer conteúdo colocado entre as tags <Title> </Title>
function Title({ children }) {
  return (
    // Container principal do título
    <div className="w-2xl flex items-center dark:text-white">
      {/*
      w-2xl -> largura máxima do container
      flex -> usa flexbox para alinhar os elementos
      items-center -> centraliza verticalmente os elementos
      dark:text-white -> no modo escuro o texto fica branco
      */}

      {/* Ícone de carteira */}
      <Wallet className="text-cyan-500" />
      {/* 
      text-cyan-500 -> define a cor azul do ícone
      */}

      {/* Título do sistema */}
      <h1 className="text-xm font-bold text-left p-4 ">{children}</h1>
      {/*
      text-xm -> tamanho do texto
      font-bold -> deixa o texto em negrito
      text-left -> alinha o texto à esquerda
      p-4 -> adiciona espaçamento interno
      */}
    </div>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default Title;
