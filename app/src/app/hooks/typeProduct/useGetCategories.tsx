import { useState } from "react";

export interface Category {
  id: string;
  name: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useGetCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/type-products`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erro ao buscar categorias');
      }

      const data = await response.json();
      setCategories(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return { getCategories, loading, error, categories };
};