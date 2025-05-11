import { ProductForm } from '@/app/components/product/ProductForm';

export default function NewProductPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Novo Produto</h1>
      <ProductForm />
    </div>
  );
}