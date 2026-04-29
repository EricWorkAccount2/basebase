import { useParams } from 'react-router-dom';
import { MOVIE_ENDPOINT, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';

export const TrailersView = () => {
  const { id } = useParams();
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');

  const endpoint = mediaType === 'movie' ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { data } = useTmdb<any>(`${endpoint}/${id}/videos`, {}, [id, mediaType]);

  const trailers = data?.results?.filter((video: any) => 
    video.type === 'Trailer' && video.site === 'YouTube'
  ) || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Trailers</h1>
      
      <div className="flex gap-2">
        <button
          onClick={() => setMediaType('movie')}
          className={`px-4 py-2 rounded ${mediaType === 'movie' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
        >
          Movie
        </button>
        <button
          onClick={() => setMediaType('tv')}
          className={`px-4 py-2 rounded ${mediaType === 'tv' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
        >
          TV Show
        </button>
      </div>

      {trailers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trailers.map((video: any) => (
            <div key={video.id} className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-bold mb-2">{video.name}</h3>
              <iframe
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                className="w-full aspect-video rounded"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No trailers found.</p>
      )}
    </div>
  );
};