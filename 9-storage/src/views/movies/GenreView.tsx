import { useSearchParams } from 'react-router-dom';
import { ImageGrid, Pagination } from '@/components';
import { type ImageCell, IMAGE_BASE_URL, DISCOVER_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export const GenreView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mediaType = searchParams.get('type') || 'movie';
  const genreId = searchParams.get('genre') || '28';
  const page = parseInt(searchParams.get('page') || '1');
  
  const genreIdNum = parseInt(genreId);
  
  const { data } = useTmdb<any>(`${DISCOVER_ENDPOINT}/${mediaType}`, {
    with_genres: genreIdNum,
    page,
  }, [mediaType, genreId, page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ type: mediaType, genre: genreId, page: newPage.toString() });
  };

  const handleMediaTypeChange = (type: string) => {
    setSearchParams({ type, genre: genreId, page: '1' });
  };

  const handleGenreChange = (genre: string) => {
    setSearchParams({ type: mediaType, genre, page: '1' });
  };

  const movieGenres = [
    { id: '28', name: 'Action' },
    { id: '12', name: 'Adventure' },
    { id: '16', name: 'Animation' },
    { id: '35', name: 'Comedy' },
    { id: '80', name: 'Crime' },
    { id: '99', name: 'Documentary' },
    { id: '18', name: 'Drama' },
    { id: '10751', name: 'Family' },
    { id: '14', name: 'Fantasy' },
    { id: '36', name: 'History' },
    { id: '27', name: 'Horror' },
    { id: '9648', name: 'Mystery' },
    { id: '10749', name: 'Romance' },
    { id: '878', name: 'Sci-Fi' },
    { id: '10770', name: 'TV Movie' },
    { id: '53', name: 'Thriller' },
    { id: '10752', name: 'War' },
    { id: '37', name: 'Western' },
  ];

  const tvGenres = [
    { id: '10759', name: 'Action & Adventure' },
    { id: '16', name: 'Animation' },
    { id: '35', name: 'Comedy' },
    { id: '80', name: 'Crime' },
    { id: '99', name: 'Documentary' },
    { id: '18', name: 'Drama' },
    { id: '10751', name: 'Family' },
    { id: '10762', name: 'Kids' },
    { id: '9648', name: 'Mystery' },
    { id: '10763', name: 'News' },
    { id: '10764', name: 'Reality' },
    { id: '10765', name: 'Sci-Fi & Fantasy' },
    { id: '10766', name: 'Soap' },
    { id: '10767', name: 'Talk' },
    { id: '10768', name: 'War & Politics' },
    { id: '37', name: 'Western' },
  ];

  const genres = mediaType === 'movie' ? movieGenres : tvGenres;

  const gridData: ImageCell[] = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imageUrl: `${IMAGE_BASE_URL}${result.poster_path || result.backdrop_path}`,
    primaryText: result.title || result.name,
    secondaryText: result.release_date || result.first_air_date,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Browse by Genre</h1>
      
      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => handleMediaTypeChange('movie')}
            className={`px-4 py-2 rounded ${mediaType === 'movie' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
          >
            Movies
          </button>
          <button
            onClick={() => handleMediaTypeChange('tv')}
            className={`px-4 py-2 rounded ${mediaType === 'tv' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
          >
            TV Shows
          </button>
        </div>
        
        <select
          value={genreId}
          onChange={(e) => handleGenreChange(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white"
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {data?.results && (
        <>
          <ImageGrid results={gridData} onClick={(id) => navigate(`/${mediaType}/${id}`)} />
          <Pagination
            page={page}
            maxPages={data.total_pages}
            onClick={handlePageChange}
          />
        </>
      )}
    </div>
  );
};