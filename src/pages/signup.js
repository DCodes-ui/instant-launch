import { useState } from 'react';
import { supabase } from '../supabase-client';
import Head from 'next/head';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      // Weiterleitung nach erfolgreicher Registrierung
      window.location.href = '/signin';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Head>
        <title>Sign Up - SaaS Landing Page</title>
      </Head>
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 font-passion">Sign Up</h2>
        {error && <p className="text-red-500 font-passion">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}