import { TypeProductList } from '@/app/components/typeProduct/TypeProductList';

export default function TypeProductPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Categorias de Produto</h1>
      <TypeProductList />
    </div>
  );
} 