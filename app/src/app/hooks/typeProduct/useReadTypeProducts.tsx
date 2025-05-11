import { useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface TypeProduct {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const useGetTypeProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typeProducts, setTypeProducts] = useState<TypeProduct[]>([]);

  const getTypeProducts = async () => {
    setLoading(true);
    setError(null);

    
    try {
      const response = await fetch(`${baseUrl}/type-products`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erro ao buscar tipos de produtos');
      }

      const data = await response.json();
      console.log(data);
      setTypeProducts(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return {
    getTypeProducts,
    loading,
    error,
    typeProducts,
  };
}; 

export const useGetSpecificTypeProduct = (typeProductId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTypeProductById = async () => {
    if (!typeProductId) {
      return;
    }

    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/type-products/${typeProductId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erro ao buscar produto');
      }

      const data = await response.json();
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return null;
    } finally {
      setLoading(false);
    }
  };


  return {
    getTypeProductById,
    loading,
    error,
  };
};