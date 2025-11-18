
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.132,44,30.023,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const logoSrc = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgcng9IjMwIiBmaWxsPSIjMDA1NUE0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSW50ZXIsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iODAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSI+VVg8L3RleHQ+PC9zdmc+";

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed) {
        // In a real app, you would validate credentials here.
        onLogin();
    } else {
        alert("Você precisa aceitar os Termos de Uso e a Política de Privacidade.");
    }
  };

  const handleGoogleLogin = () => {
     if (agreed) {
        // In a real app, this would trigger the OAuth flow.
        onLogin();
    } else {
        alert("Você precisa aceitar os Termos de Uso e a Política de Privacidade.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-light dark:bg-neutral-900 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <img src={logoSrc} alt="UNEX Logo" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary dark:text-blue-400">UNEX</h1>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-dark dark:text-white">Bem-vindo, Calouro!</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Faça login para começar sua jornada.</p>
        </div>
        
        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-neutral-700 dark:text-white transition-colors"
        >
          <GoogleIcon />
          Entrar com Google
        </button>

        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-full bg-gray-200 dark:bg-gray-700"></span>
          <span className="text-sm text-gray-400">OU</span>
          <span className="h-px w-full bg-gray-200 dark:bg-gray-700"></span>
        </div>

        <form className="space-y-6" onSubmit={handleEmailLogin}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:text-white focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
              placeholder="seuemail@unex.edu.br"
            />
          </div>

          <div>
            <label htmlFor="password-" className="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:text-white focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          
          <div className="text-right text-sm">
            <a href="#" className="font-medium text-secondary dark:text-blue-400 hover:text-primary dark:hover:text-blue-300">Esqueceu a senha?</a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
        
        <div className="mt-6">
            <label className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <input type="checkbox" className="h-4 w-4 text-primary focus:ring-secondary border-gray-300 rounded" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <span className="ml-2">
                    Eu li e concordo com os <a href="#" className="font-medium text-secondary dark:text-blue-400 hover:underline">Termos de Uso</a> e a <a href="#" className="font-medium text-secondary dark:text-blue-400 hover:underline">Política de Privacidade</a>.
                </span>
            </label>
        </div>

      </div>
    </div>
  );
};
