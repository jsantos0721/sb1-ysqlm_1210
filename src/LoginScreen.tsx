import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-8">
            <LogIn size={64} className="text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-center mb-5">Iniciar Sesión</h1>
          </div>
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="flex flex-col">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 border focus:ring-red-500 focus:border-red-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  required
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-4 py-2 border focus:ring-red-500 focus:border-red-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  required
                />
              </div>
            </div>
            <div className="pt-4 flex items-center space-x-4">
              <button type="submit" className="bg-red-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-red-600 transition-colors duration-300">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;