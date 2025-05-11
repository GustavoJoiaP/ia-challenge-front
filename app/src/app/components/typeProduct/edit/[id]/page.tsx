import { TypeProductForm } from '@/app/components/typeProduct/TypeProductForm';

export const dynamic = 'force-dynamic';

export default async function EditTypeProductPage({ params }: { params: { id: string } }) {
  const id = await Promise.resolve(params.id);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Editar Tipo de Produto</h1>
      <TypeProductForm typeProductId={id} />
    </div>
  );
} 