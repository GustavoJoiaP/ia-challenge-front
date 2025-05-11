import { ProductForm } from '@/app/components/product/ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const id = await Promise.resolve(params.id);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Editar Produto</h1>
      <ProductForm productId={id} />
    </div>
  );
} 