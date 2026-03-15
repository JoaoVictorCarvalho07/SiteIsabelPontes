import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeEditorial from './pages/HomeEditorial';
import SobreMim from './pages/SobreMim';
import NavBar from './components/NavBar';
import ContactSection from './pages/ContactSection';
import NotFound from './pages/NotFound';
import PhotoGallery from './pages/PhotoGallery';
import { useGallery } from './hooks/useGallery';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  const { fotos } = useGallery();
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<HomeEditorial />} />
        {/* <Route path="/portfolio" element={<Portfolio />} /> */}
        {/* <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} /> */}
        {/* <Route path="/parceiros" element={<Partners />} /> */}
        <Route path="/sobre" element={<SobreMim />} />
        <Route path="/contato" element={<ContactSection />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/galeria" element={<PhotoGallery />} />
      </Routes>

      <p className="gallery-footer">
        © 2026 Isabel Pontes · Todos os direitos reservados
      </p>
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
