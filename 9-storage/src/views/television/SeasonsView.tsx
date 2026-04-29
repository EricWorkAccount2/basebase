import { useParams, useSearchParams } from 'react-router-dom';
import { TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';

export const SeasonsView = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const seasonNumber = searchParams.get('season') || '1';

  const { data: showData } = useTmdb<any>(`${TV_ENDPOINT}/${id}`, {}, [id]);
  const { data: seasonData } = useTmdb<any>(`${TV_ENDPOINT}/${id}/season/${seasonNumber}`, {}, [id, seasonNumber]);

  if (!showData) return <div className="text-white">Loading...</div>;

  const seasons = showData.seasons?.filter((s: any) => s.season_number > 0) || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{showData.name} - Seasons</h1>
      
      <div className="flex gap-2 flex-wrap">
        {seasons.map((season: any) => (
          <a
            key={season.id}
            href={`/tv/${id}/seasons?season=${season.season_number}`}
            className={`px-4 py-2 rounded bg-gray-700 text-white ${parseInt(seasonNumber) === season.season_number ? 'bg-blue-500' : ''}`}
          >
            Season {season.season_number}
          </a>
        ))}
      </div>

      {seasonData && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Season {seasonNumber}</h2>
          <p className="text-gray-300">{seasonData.overview}</p>
          
          {seasonData.episodes && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {seasonData.episodes.map((episode: any) => (
                <div key={episode.id} className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-white font-bold">Episode {episode.episode_number}: {episode.name}</h3>
                  <p className="text-gray-400 text-sm mt-2">{episode.overview}</p>
                  <p className="text-gray-500 text-xs mt-2">Air date: {episode.air_date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};