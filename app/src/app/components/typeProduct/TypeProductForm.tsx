'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateTypeProduct } from '@/app/hooks/typeProduct/useCreateTypeProduct';
import { useUpdateTypeProduct } from '@/app/hooks/typeProduct/useUpdateTypeProduct';
import { useRouter } from 'next/navigation';
import { useGetSpecificTypeProduct, useGetTypeProducts } from '@/app/hooks/typeProduct/useReadTypeProducts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';


interface TypeProductFormProps {
  typeProductId?: string;
}

export function TypeProductForm({ typeProductId }: TypeProductFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const { createTypeProduct, loading , error, success} = useCreateTypeProduct();
  const { updateTypeProduct } = useUpdateTypeProduct(typeProductId);
  const { getTypeProducts } = useGetTypeProducts();
  const { getTypeProductById } = useGetSpecificTypeProduct(typeProductId);
  
  useEffect(() => {
    const loadData = async () => {
      await getTypeProducts();
      if (typeProductId) {
        const typeProduct = await getTypeProductById();
        if (typeProduct) {
          setName(typeProduct.name);
          setDescription(typeProduct.description);
        }
      }
    };
    
    loadData();
  }, [typeProductId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const typeProductDataUpdate = {
      id: typeProductId,
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const typeProductDataCreate = {
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let success = false;
    if (typeProductId) {
      success = await updateTypeProduct(typeProductDataUpdate);
    } else {
      success = await createTypeProduct(typeProductDataCreate);
    }

    if (success) {
      await getTypeProducts(); // Atualiza a lista de produtos
      setTimeout(() => {
        router.push('/components/typeProduct'); // Redireciona para a lista de produtos
      }, 2000);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-4 shadow-xl rounded-2xl mt-10">
      <CardHeader>
        <CardTitle className="text-xl">
          {typeProductId ? 'Editar categoria de Produto' : 'Nova categoria de Produto'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome da categoria do Produto</Label>
            <Input
              id="name"
              placeholder="Nome da categoria do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Descrição da categoria do produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {typeProductId ? 'Atualizar' : 'Criar'} Categoria de Produto
          </Button>
        </form>

        {success && (
          <Alert variant="default" className="mt-4 border-green-500 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
} 