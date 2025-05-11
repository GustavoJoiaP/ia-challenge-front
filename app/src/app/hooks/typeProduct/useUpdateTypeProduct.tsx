import { useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface UpdateTypeProductDTO {
  id?: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const useUpdateTypeProduct = (typeProductId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateTypeProduct = async (data: UpdateTypeProductDTO) => {
    
    if (!typeProductId) {
      console.log('No typeProductId provided for update');
      setError('ID do tipo de produto não fornecido');
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    

    try {
      const response = await fetch(`${baseUrl}/type-products/${typeProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erro ao atualizar tipo de produto');
      }

      setSuccess('Tipo de produto atualizado com sucesso!');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateTypeProduct,
    loading,
    error,
    success,
  };
};
