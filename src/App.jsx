import { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import ConceptDetail from './pages/ConceptDetail';
import News from './pages/News';
import Simulator from './pages/Simulator';
import Game from './pages/Game';
import Glossary from './pages/Glossary';

// Prevent browser from restoring scroll position on navigation
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function ScrollToTop() {
  const { pathname } = useLocation();
  // useLayoutEffect runs synchronously before paint — no flash of wrong scroll position
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <NavBar />
      <main style={{ flex: 1, paddingBottom: 80 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:moduleId" element={<Learn />} />
          <Route path="/concept/:conceptId" element={<ConceptDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/game" element={<Game />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
