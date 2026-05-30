import { Outlet } from 'react-router-dom';
import Chatbot from './Chatbot';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="page-shell" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
