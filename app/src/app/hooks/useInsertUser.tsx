import { useState } from 'react';

interface RegisterData {
  email: string;
  password: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useInsertUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const register = async ({ email, password }: RegisterData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${baseUrl}/users/insert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erro no cadastro');
      }

      const data = await response.json();
      setSuccess(data.message);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};