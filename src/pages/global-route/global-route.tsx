import { Outlet } from 'react-router-dom';

export default function GlobalRoute() {
  return (
    <>
      <p>Header</p>
      <Outlet />
      <p>Footer</p>
    </>
  );
}
