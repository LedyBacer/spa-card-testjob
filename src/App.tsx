import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/not-found/not-found.tsx';
import GlobalRoute from './pages/global-route/global-route.tsx';
import HomePage from './pages/home-page/home-page.tsx';
import ImageDetails from './pages/image-details/image-details.tsx';

export default function App() {
  return (
    <Routes>
      <Route element={<GlobalRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/image/:id" element={<ImageDetails />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
