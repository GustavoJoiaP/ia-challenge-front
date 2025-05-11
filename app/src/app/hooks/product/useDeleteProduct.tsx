import { useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const deleteProduct = async (productId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${baseUrl}/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erro ao deletar produto');
      }

      setSuccess('Produto deletado com sucesso!');
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteProduct,
    loading,
    error,
    success,
  };
}; 