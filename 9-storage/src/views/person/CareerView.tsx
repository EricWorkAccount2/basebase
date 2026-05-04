import { useParams, useNavigate } from 'react-router-dom';
import { ImageGrid } from '@/components';
import { PERSON_ENDPOINT, IMAGE_BASE_URL } from '@/core';
import { useTmdb } from '@/hooks';

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: personData } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}`, {}, [id]);
  const { data: creditsData } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {}, [id]);
  const { data: tvCreditsData } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}/tv_credits`, {}, [id]);

  if (!personData) return <div className="text-white">Loading...</div>;

  const allCredits = [
    ...(creditsData?.cast || []).map((item: any) => ({ ...item, media_type: 'movie' })),
    ...(tvCreditsData?.cast || []).map((item: any) => ({ ...item, media_type: 'tv' })),
  ].sort((a: any, b: any) =>
    new Date(b.release_date || b.first_air_date || 0).getTime() - new Date(a.release_date || a.first_air_date || 0).getTime()
  );

  const results = allCredits.map((c: any) => ({
    id: c.id,
    imageUrl: `${IMAGE_BASE_URL}${c.poster_path || c.backdrop_path || c.profile_path}`,
    primaryText: c.title || c.name,
    secondaryText: c.character || c.job || c.release_date || c.first_air_date,
    media_type: c.media_type,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{personData.name} - Career</h1>

      {results.length > 0 ? (
        <ImageGrid
          results={results}
          onClick={(creditId) => {
            const credit = allCredits.find((a: any) => a.id === creditId);
            if (!credit) return;
            if (credit.media_type === 'movie') navigate(`/movie/${creditId}/credits`);
            else navigate(`/tv/${creditId}/seasons`);
          }}
        />
      ) : (
        <p className="text-gray-400">No credits found.</p>
      )}
    </div>
  );
};