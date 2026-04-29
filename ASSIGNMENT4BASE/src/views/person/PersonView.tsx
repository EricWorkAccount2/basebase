import { useParams } from 'react-router-dom';
import { PERSON_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';

export const PersonView = () => {
  const { id } = useParams();

  const { data } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}`, {}, [id]);

  if (!data) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        {data.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
            alt={data.name}
            className="w-64 h-96 object-cover rounded-lg"
          />
        )}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">{data.name}</h1>
          
          {data.birthday && (
            <div>
              <p className="text-gray-400">Born:</p>
              <p className="text-white">{data.birthday} {data.place_of_birth && `in ${data.place_of_birth}`}</p>
            </div>
          )}
          
          {data.deathday && (
            <div>
              <p className="text-gray-400">Died:</p>
              <p className="text-white">{data.deathday}</p>
            </div>
          )}
          
          {data.known_for_department && (
            <div>
              <p className="text-gray-400">Known for:</p>
              <p className="text-white">{data.known_for_department}</p>
            </div>
          )}
          
          {data.biography && (
            <div>
              <p className="text-gray-400">Biography:</p>
              <p className="text-gray-300">{data.biography}</p>
            </div>
          )}

          <div className="flex gap-4">
            <a
              href={`/person/${id}/career`}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Career
            </a>
            <a
              href={`/person/${id}/images`}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              View Images
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};