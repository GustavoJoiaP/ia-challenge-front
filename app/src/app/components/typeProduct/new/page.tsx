import { TypeProductForm } from '@/app/components/typeProduct/TypeProductForm';

export default function NewTypeProductPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Novo Tipo de Produto</h1>
      <TypeProductForm />
    </div>
  );
} 