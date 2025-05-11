'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useProductForm } from '@/app/hooks/product/useProductForm';
import { useGetProducts, useGetSpecificProduct } from '@/app/hooks/product/useReadProducts';
import { TypeProduct, useGetTypeProducts } from '@/app/hooks/typeProduct/useReadTypeProducts';

interface ProductFormProps {
  productId?: string;
}

export function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  
  const { createProduct, updateProduct, loading, error, success } = useProductForm(productId);
  const { getProducts } = useGetProducts();
  const { getTypeProducts, typeProducts, loading: categoriesLoading } = useGetTypeProducts();
  const { getProductById} = useGetSpecificProduct(productId);

  useEffect(() => {
    const loadData = async () => {
      await getTypeProducts();
      if (productId) {
        const product = await getProductById();
        if (product) {
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price.toString());
          setStock(product.stock.toString());
          setCategoryId(product.categoryId);
        }
      }
    };
    
    loadData();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productDataUpdate = {
      id: productId,
      name,
      description,
      price: parseFloat(price),
      typeProductId: categoryId,
      stock: parseInt(stock),
    };

    const productDataCreate = {
      name,
      description,
      price: parseFloat(price),
      typeProductId: categoryId,
      stock: parseInt(stock),
    };

    let success = false;
    if (productId) {
      success = await updateProduct(productDataUpdate);
    } else {
      success = await createProduct(productDataCreate);
    }

    if (success) {
      await getProducts(); // Atualiza a lista de produtos
      setTimeout(() => {
        router.push('/components/product'); // Redireciona para a lista de produtos
      }, 2000);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-4 shadow-xl rounded-2xl mt-10">
      <CardHeader>
        <CardTitle className="text-xl">
          {productId ? 'Editar Produto' : 'Novo Produto'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              placeholder="Nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Descrição do produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="stock">Estoque</Label>
            <Input
              id="stock"
              type="number"
              placeholder="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Categoria</Label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Selecione uma categoria</option>
              {categoriesLoading ? (
                <option value="loading" disabled>
                  Carregando categorias...
                </option>
              ) : typeProducts && typeProducts.length > 0 ? (
                typeProducts.map((typeProduct: TypeProduct) => (
                  <option key={typeProduct.id} value={typeProduct.id}>
                    {typeProduct.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Nenhuma categoria disponível
                </option>
              )}
            </select>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {productId ? 'Atualizar' : 'Criar'} Produto
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