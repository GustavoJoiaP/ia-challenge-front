
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          E-Shop
        </Link>

        {/* Menu */}
        <nav className="space-x-6 hidden md:flex">
          <Link href="/components/product" className="text-gray-700 hover:text-gray-900">Produtos</Link>
          <Link href="/categories" className="text-gray-700 hover:text-gray-900">Categorias</Link>
          <Link href="/orders" className="text-gray-700 hover:text-gray-900">Pedidos</Link>
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {/* Badge opcional */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                3
              </span>
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="default">Entrar</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
