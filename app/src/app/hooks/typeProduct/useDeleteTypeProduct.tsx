import { useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useDeleteTypeProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const deleteTypeProduct = async (typeProductId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${baseUrl}/type-products/${typeProductId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erro ao deletar tipo de produto');
      }

      setSuccess('Tipo de produto deletado com sucesso!');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteTypeProduct,
    loading,
    error,
    success,
  };
}; 