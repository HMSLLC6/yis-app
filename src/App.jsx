import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import ConceptDetail from './pages/ConceptDetail';
import Simulator from './pages/Simulator';
import Glossary from './pages/Glossary';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <main style={{ flex: 1, paddingBottom: 80 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:moduleId" element={<Learn />} />
          <Route path="/concept/:conceptId" element={<ConceptDetail />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
