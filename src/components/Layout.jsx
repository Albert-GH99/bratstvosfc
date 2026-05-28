import { Outlet } from 'react-router-dom';
import BottomTabNavigation from './BottomTabNavigation';
import Chatbot from './Chatbot';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="page-shell" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />
      <main className="pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomTabNavigation />
      <Chatbot />
    </div>
  );
}
