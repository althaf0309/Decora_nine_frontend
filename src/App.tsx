import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ScrollReveal } from './components/ScrollReveal';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Services, ServiceDetail } from './pages/Services';
import { Projects, ProjectDetail } from './pages/Projects';
import { NewsList, NewsDetail } from './pages/News';
import { Contact, About } from './pages/Contact';
import { PrivacyPolicy, Terms } from './pages/Legal';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollReveal />
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/news" element={<NewsList />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </BrowserRouter>
  );
}

export default App;
