'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { useGetTypeProducts } from '@/app/hooks/typeProduct/useReadTypeProducts';
import { useDeleteTypeProduct } from '@/app/hooks/typeProduct/useDeleteTypeProduct';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export function TypeProductList() {
  const { getTypeProducts, loading, error, typeProducts } = useGetTypeProducts();
  const { deleteTypeProduct, loading: deleteLoading } = useDeleteTypeProduct();

  useEffect(() => {
    getTypeProducts();
  }, []);

  const handleDelete = (typeProductId: string) => {
    toast('Tem certeza que deseja deletar este tipo de produto?', {
      action: {
        label: 'Deletar',
        onClick: async () => {
          const success = await deleteTypeProduct(typeProductId);
          if (success) {
            toast.success('Tipo de produto deletado com sucesso!');
            getTypeProducts(); // Recarrega a lista após deletar
          } else {
            toast.error('Erro ao deletar tipo de produto');
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
        <Link href="/components/typeProduct/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Categoria de Produto
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {typeProducts.map((typeProduct) => (
          <Card key={typeProduct.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{typeProduct.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">{typeProduct.description}</p>
              <div className="flex gap-2">
                <Link href={`/components/typeProduct/edit/${typeProduct.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Editar Tipo
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={() => handleDelete(typeProduct.id)}
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