import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/speakio/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

        if (response.status !== 200) {
          setMessage('Incorrect name or password');
        }

      const result = await response.json();
    } catch (error) {
      setMessage('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container w-full h-full">
      <form onSubmit={handleLogin} className="login-form flex flex-col items-center justify-center w-full h-full">
        <h2 className='text-2xl font-semibold text-center'>Login</h2>

        <div className="form-group self-center my-2 flex flex-col gap-1">
          <label htmlFor="name" className='font-semibold text-sm'>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border min-w-[300px] px-2 border-slate-400 max-w-[300px] py-1 focus-visible:border focus-visible:border-[#C1DF1F] outline-none rounded-md'
            required
          />
        </div>
        <div className="form-group self-center my-2 flex flex-col gap-1">
          <label htmlFor="password" className='font-semibold text-sm'>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border min-w-[300px] px-2 border-slate-400 max-w-[300px] py-1 focus-visible:border focus-visible:border-[#C1DF1F] outline-none rounded-md'
            required
          />
        </div>
        <button className='bg-[#C1DF1F] flex gap-2 items-center justify-center self-center min-w-[300px] max-w-[300px]  text-white rounded-xl px-8 py-2 font-semibold' type="submit">
          {loading ? (
            <span className='flex items-center gap-2'>
              <Loader2 size={20} className="animate-spin" />
              <span className="ml-2">Logging In..</span>
            </span>
          ) : 'Login'}
        </button>
      {message && <p onMouseOver={() => setTimeout(() =>setMessage(null), 500)} className='bg-slate-600 px-8 py-2 hover:cursor-pointer rounded-lg text-white font-semibold shadow-md transition duration-400 hover:bg-slate-800'>{message}</p>}
      </form>
    </div>
  );
};

export default LoginPage;

