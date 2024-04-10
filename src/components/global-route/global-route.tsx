import { Outlet } from 'react-router-dom';
import AppHeader from '../app-header/app-header.tsx';
import AppFooter from '../app-footer/app-footer.tsx';

export default function GlobalRoute() {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
}
