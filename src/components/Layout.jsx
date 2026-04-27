import { Outlet } from 'react-router-dom';
import BottomTabNavigation from './BottomTabNavigation';
import Chatbot from './Chatbot';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: 'var(--c-bg)', minHeight: '100vh' }}>
      <Navbar />
      <main className="pt-16 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomTabNavigation />
      <Chatbot />
    </div>
  );
}
