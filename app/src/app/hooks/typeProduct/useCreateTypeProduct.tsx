import { useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface CreateTypeProductDTO {
  name: string;
  description: string;
}

export const useCreateTypeProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createTypeProduct = async (data: CreateTypeProductDTO) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${baseUrl}/type-products/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erro ao criar tipo de produto');
      }

      setSuccess('Tipo de produto criado com sucesso!');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createTypeProduct,
    loading,
    error,
    success,
  };
};
