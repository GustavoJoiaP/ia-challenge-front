// components/ProductCard.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ProductCard({ product }: { product: { name: string; price: number } }) {
  return (
    <Card className="w-full md:w-64">
      <CardContent>
        <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
        <p className="text-gray-500">${product.price}</p>
        <Button className="mt-4 w-full">Adicionar ao Carrinho</Button>
      </CardContent>
    </Card>
  )
}
