import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col bg-gray-900 text-white">
      <section className="flex-1 flex items-center justify-center">
        <div className="max-w-3xl w-full text-center space-y-8">
          <h1 className="text-5xl font-bold tracking-tight">Qayumplex</h1>
          <p className="text-gray-400 text-lg">Explore movies and discover people using a fast, modern interface.</p>
          <Button onClick={() => navigate('/movies/now_playing')}>Enter</Button>
          <p className="text-sm text-gray-500">Built with React, Vite and React Router</p>
        </div>
      </section>
    </main>
  );
};
