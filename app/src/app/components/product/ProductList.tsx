'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { useGetProducts } from '@/app/hooks/product/useReadProducts';
import { useDeleteProduct } from '@/app/hooks/product/useDeleteProduct';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export function ProductList() {
  const { getProducts, loading, error, products } = useGetProducts();
  const { deleteProduct, loading: deleteLoading } = useDeleteProduct();

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (productId: string) => {
    toast('Tem certeza que deseja deletar este produto?', {
      action: {
        label: 'Deletar',
        onClick: async () => {
          const success = await deleteProduct(productId);
          if (success) {
            toast.success('Produto deletado com sucesso!');
            getProducts(); // Recarrega a lista após deletar
          } else {
            toast.error('Erro ao deletar produto');
          }
        },
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          toast.info('Ação cancelada.');
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link href="/components/product/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-semibold text-primary mb-4">
                R$ {product.price.toFixed(2)}
              </p>
              <div className="flex gap-2">
                <Link href={`/components/product/edit/${product.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Editar Produto
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => handleDelete(product.id)}
                  disabled={deleteLoading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Deletar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

