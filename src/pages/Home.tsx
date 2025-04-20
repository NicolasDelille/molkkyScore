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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    {t('app.title')}
                </h1>
                <p className="text-gray-600 mb-12 text-center">{t('app.description')}</p>

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
                    to="/stats"
                    className="block w-full bg-green-500 text-white py-3 px-6 rounded-lg text-center hover:bg-green-600 transition-colors"
                >
                    {t('home.stats')}
                </Link>

                <Link
                    to="/history"
                    className="block w-full bg-gray-500 text-white py-3 px-6 rounded-lg text-center hover:bg-gray-600 transition-colors"
                >
                    {t('home.history')}
                </Link>

                <Link
                    to="/settings"
                    className="block w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white py-3 px-6 rounded-lg text-center hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                >
                    {t('home.settings')}
                </Link>
            </div>
        </div>
    );
};

export default Home; 