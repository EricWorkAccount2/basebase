import { LinkGroup } from '@/components';
import { ICON_SIZE } from '@/core';
import { useUserContext } from '@/hooks';
import { FaRegHeart } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const { userName, favorites } = useUserContext();

  return (
    <header className="bg-gray-900 text-white border-b border-gray-700">
      <div className="max-w-7xl mx-auto p-5 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">TMDB Explorer</h1>
            <LinkGroup
              options={[
                { label: 'Now Playing', to: '/now-playing' },
                { label: 'Trending', to: '/trending?interval=day' },
                { label: 'Genre', to: '/genre' },
                { label: 'TV Shows', to: '/tv' },
                { label: 'Search', to: '/search' },
              ]}
            />
          </div>
          <div className="flex items-center">
            <h1 className="text-xl text-gray-300 mr-4">{userName}</h1>
            <button onClick={() => navigate('/favorites')} className="relative p-2 rounded-full hover:bg-gray-700 transition">
              <FaRegHeart size={ICON_SIZE} />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -left-1 bg-blue-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {favorites.size}
                </span>
              )}
            </button>
            <button onClick={() => navigate('/settings')} className="relative p-2 rounded-full hover:bg-gray-700 transition">
              <GoGear size={ICON_SIZE} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
