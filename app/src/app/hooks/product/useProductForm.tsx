import { useState } from "react";

export interface ProductFormData {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  typeProductId: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useProductForm = (productId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const createProduct = async (data: ProductFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${baseUrl}/products/insert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erro ao criar produto');
      }

      setSuccess('Produto criado com sucesso!');
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (data: ProductFormData) => {
    if (!productId) {
      setError('ID do produto não fornecido');
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${baseUrl}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erro ao atualizar produto');
      }

      setSuccess('Produto atualizado com sucesso!');
      return true;
    } catch (err: unknown) {
      console.error('Error updating product:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    updateProduct,
    loading,
    error,
    success,
  };
};