import { ProductList } from '@/app/components/product/ProductList';

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Lista de Produtos</h1>
      <ProductList />
    </div>
  );
} 