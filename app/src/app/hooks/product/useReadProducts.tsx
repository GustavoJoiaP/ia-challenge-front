import { useState } from "react"

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useGetProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/products`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erro ao buscar produtos');
      }

      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };
  
  return { getProducts, loading, error, products };
}; 


export const useGetSpecificProduct = (productId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProductById = async () => {
    if (!productId) {
      return;
    }

    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/products/${productId}`, {
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
    getProductById,
    loading,
    error,
  };
};