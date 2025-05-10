import { useState } from "react"

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  // Adicione outros campos conforme necessário
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
      setProducts(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return { getProducts, loading, error, products };
}; 