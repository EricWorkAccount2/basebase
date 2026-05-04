import { ImageGrid, Pagination } from '@/components';
import { type ImageCell, IMAGE_BASE_URL, MOVIE_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const MoviesView = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const activeCategory = category || 'now_playing';
  const [page, setPage] = useState<number>(1);

  const { data } = useTmdb<any>(`${MOVIE_ENDPOINT}/${activeCategory}`, { page }, [activeCategory, page]);

  const gridData: ImageCell[] = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imageUrl: `${IMAGE_BASE_URL}${result.poster_path}`,
    primaryText: result.title,
    secondaryText: result.release_date,
  }));

  const categories = [
    { key: 'now_playing', label: 'Now Playing' },
    { key: 'popular', label: 'Popular' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'upcoming', label: 'Upcoming' },
  ];

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto space-y-5 p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Movies</h1>

        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => navigate(`/movies/${c.key}`)}
              className={`px-4 py-2 rounded ${activeCategory === c.key ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <ImageGrid results={gridData} onClick={(id) => navigate(`/movie/${id}/credits`)} />

      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
