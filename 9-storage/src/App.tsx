import { MainLayout } from '@/layouts';
import {
  CareerView,
  CreditsView,
  EpisodeView,
  ErrorView,
  GenreView,
  HomeView,
  ImagesView,
  MovieView,
  MoviesView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  TelevisionView,
  TrendingView,
  TrailersView,
} from '@/views';
import { Route, Routes, Navigate } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        {/* Movies */}
        <Route path="/movies">
          <Route index element={<Navigate to="/movies/now_playing" replace />} />
          <Route path=":category" element={<MoviesView />} />
        </Route>
        <Route path="/trending" element={<TrendingView />} />
        <Route path="/genre" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />
        
        {/* Movie details with nested routes */}
        <Route path="/movie/:id" element={<MovieView />}>
          <Route index element={<CreditsView />} />
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="trailers" element={<TrailersView />} />
        </Route>
        
        {/* TV Shows */}
        <Route path="/tv" element={<TelevisionView />} />
        <Route path="/tv/:id/seasons" element={<SeasonsView />} />
        <Route path="/tv/:id/seasons/episode" element={<EpisodeView />} />
        
        {/* Person */}
        <Route path="/person/:id" element={<PersonView />} />
        <Route path="/person/:id/career" element={<CareerView />} />
        <Route path="/person/:id/images" element={<ImagesView />} />
        
        {/* User (removed) */}
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
