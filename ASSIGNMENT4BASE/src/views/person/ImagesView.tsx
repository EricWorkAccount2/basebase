import { useParams } from 'react-router-dom';
import { PERSON_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';

export const ImagesView = () => {
  const { id } = useParams();

  const { data: personData } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}`, {}, [id]);
  const { data: imagesData } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}/images`, {}, [id]);

  if (!personData) return <div className="text-white">Loading...</div>;

  const images = imagesData?.profiles || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">{personData.name} - Images</h1>
      
      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img: any, index: number) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
              alt={`${personData.name} ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No images found.</p>
      )}
    </div>
  );
};