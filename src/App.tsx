import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Suspense } from 'react';
import i18n from './utils/i18n';
import Home from './pages/Home';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Winner from './pages/Winner';
import History from './pages/History';
import Stats from './pages/Stats';
import DebugI18n from './components/DebugI18n';
import Loading from './components/Loading';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<Loading />}>
        <I18nextProvider i18n={i18n}>
          <DebugI18n />
          <Router>
            <div className="min-h-screen bg-gray-100 pb-20">
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/winner" element={<Winner />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/stats" element={<Stats />} />
                </Routes>
              </main>
              <Navbar />
            </div>
          </Router>
        </I18nextProvider>
      </Suspense>
    </div>
  );
}

export default App;
