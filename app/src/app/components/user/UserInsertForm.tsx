'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useInsertUser } from '@/app/hooks/useInsertUser';

export function UserInsertForm() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { register, loading, error, success } = useInsertUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ email, password });
  };

  return (
    <Card className="max-w-md mx-auto p-4 shadow-xl rounded-2xl mt-10">
      <CardHeader>
        <CardTitle className="text-xl">Cadastro de Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="joao@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cadastrar
          </Button>
        </form>

        {success && (
          <Alert variant="default" className="mt-4 border-green-500 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}