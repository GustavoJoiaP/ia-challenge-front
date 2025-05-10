import { UserInsertForm } from "./components/user/UserInsertForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Sistema de Produtos</h1>
      <div className="flex justify-center mb-8">
        <Link href="/components/product">
          <Button variant="outline" className="text-lg">
            Ver Lista de Produtos
          </Button>
        </Link>
      </div>
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Cadastro de Usuário</h2>
        <UserInsertForm />
      </div>
    </div>
  );
}
