import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeEditorial from './pages/HomeEditorial';
import SobreMim from './pages/SobreMim';
import NavBar from './components/NavBar';
import ContactSection from './pages/ContactSection';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Partners from './pages/Partners';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<HomeEditorial />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/parceiros" element={<Partners />} />
        <Route path="/sobre" element={<SobreMim />} />
        <Route path="/contato" element={<ContactSection />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
