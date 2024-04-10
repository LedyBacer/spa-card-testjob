import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/not-found/not-found.tsx';
import GlobalRoute from './components/global-route/global-route.tsx';
import HomePage from './pages/home-page/home-page.tsx';
import CardDetails from './pages/card-details/card-details.tsx';

export default function App() {
  return (
    <Routes>
      <Route element={<GlobalRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/:page" element={<HomePage />} />
        <Route path="/card/:id" element={<CardDetails />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
