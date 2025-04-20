import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';

const Winner = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { winner, resetGameState } = useGameStore();

    const handleNewGame = () => {
        resetGameState();
        navigate('/game');
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sm:p-8 max-w-md w-full text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                    {t('winner.title')}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                    {t('winner.congratulations', { name: winner?.name })}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    {t('winner.score', { score: winner?.score })}
                </p>
                <div className="space-y-4">
                    <button
                        onClick={handleNewGame}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        {t('winner.newGame')}
                    </button>
                    <Link
                        to="/"
                        className="block w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        {t('winner.home')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Winner; 