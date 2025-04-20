import { Routes, Route } from 'react-router-dom';
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

export const AppRoutes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <I18nextProvider i18n={i18n}>
                <DebugI18n />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/winner" element={<Winner />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/stats" element={<Stats />} />
                </Routes>
            </I18nextProvider>
        </Suspense>
    );
}; 