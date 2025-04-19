import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';

const Home = () => {
    const { t } = useTranslation();
    const { gameStarted, resetGame } = useGameStore();

    const handleNewGame = () => {
        resetGame();
    };

    const handleContinueGame = () => {
        // Pas besoin de réinitialiser, on continue la partie en cours
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">{t('app.title')}</h1>
            <p className="text-gray-600 mb-12 text-center">{t('app.description')}</p>

            <div className="space-y-4 w-full max-w-md">
                {gameStarted ? (
                    <>
                        <Link
                            to="/game"
                            onClick={handleContinueGame}
                            className="block w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-600 transition-colors"
                        >
                            {t('game.continueGame')}
                        </Link>
                        <button
                            onClick={handleNewGame}
                            className="block w-full bg-red-500 text-white py-3 px-6 rounded-lg text-center hover:bg-red-600 transition-colors"
                        >
                            {t('game.newGame')}
                        </button>
                    </>
                ) : (
                    <Link
                        to="/game"
                        className="block w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-600 transition-colors"
                    >
                        {t('home.newGame')}
                    </Link>
                )}

                <Link
                    to="/history"
                    className="block w-full bg-gray-500 text-white py-3 px-6 rounded-lg text-center hover:bg-gray-600 transition-colors"
                >
                    {t('home.history')}
                </Link>

                <Link
                    to="/settings"
                    className="block w-full bg-gray-300 text-gray-800 py-3 px-6 rounded-lg text-center hover:bg-gray-400 transition-colors"
                >
                    {t('home.settings')}
                </Link>
            </div>
        </div>
    );
};

export default Home; 