import { useTranslation } from 'react-i18next';
import { useStatsStore } from '../store/useStatsStore';
import { useEffect } from 'react';

const Stats = () => {
    const { t } = useTranslation();
    const { players, clearStats } = useStatsStore();

    useEffect(() => {
        console.log('Stats loaded:', players);
    }, [players]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('stats.title')}</h1>
                        {Object.keys(players).length > 0 && (
                            <button
                                onClick={clearStats}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                {t('stats.clear')}
                            </button>
                        )}
                    </div>

                    {Object.keys(players).length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-300 text-center">{t('stats.empty')}</p>
                    ) : (
                        <div className="space-y-6">
                            {Object.values(players)
                                .sort((a, b) => b.gamesWon - a.gamesWon)
                                .map((player) => (
                                    <div key={player.name} className="border rounded-lg p-4 dark:border-gray-700">
                                        <h2 className="text-xl font-semibold mb-4 dark:text-white">{player.name}</h2>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">{t('stats.gamesPlayed')}</div>
                                                <div className="text-lg font-bold dark:text-white">{player.gamesPlayed}</div>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">{t('stats.gamesWon')}</div>
                                                <div className="text-lg font-bold dark:text-white">{player.gamesWon}</div>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">{t('stats.averageScore')}</div>
                                                <div className="text-lg font-bold dark:text-white">{player.averageScore.toFixed(1)}</div>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">{t('stats.bestScore')}</div>
                                                <div className="text-lg font-bold dark:text-white">{player.bestScore}</div>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">{t('stats.accuracy')}</div>
                                                <div className="text-lg font-bold dark:text-white">{((player.accuracy || 0) * 100).toFixed(1)}%</div>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">{t('stats.eliminations')}</div>
                                                <div className="text-lg font-bold dark:text-white">{player.eliminations}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stats; 