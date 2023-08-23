import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
export default Layout;
