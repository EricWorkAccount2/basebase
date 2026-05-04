import { LinkGroup } from '@/components';

export const Header = () => {
  return (
    <header className="bg-gray-900 text-white border-b border-gray-700">
      <div className="max-w-7xl mx-auto p-5 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold">Qayumplex</h1>
            <LinkGroup
              options={[
                { label: 'Movies', to: '/movies/now_playing' },
                { label: 'Trending', to: '/trending?interval=day' },
                { label: 'Genre', to: '/genre' },
                { label: 'TV Shows', to: '/tv' },
                { label: 'Search', to: '/search' },
              ]}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
