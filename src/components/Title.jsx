import { Wallet } from "lucide-react";

function Title({ children }) {
  return (
    <div className="w-2xl flex items-center dark:text-white">
      <Wallet className="text-cyan-500" />
      <h1 className="text-xm font-bold text-left p-4 ">{children}</h1>
    </div>
  );
}

export default Title;
