'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useGetProducts } from '@/app/hooks/product/useReadProducts';

export function ProductList() {
  const { getProducts, loading, error, products } = useGetProducts();

  useEffect(() => {
    getProducts();
  }, []);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-semibold text-primary">
              R$ {product.price.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}