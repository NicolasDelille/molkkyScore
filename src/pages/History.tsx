import { useTranslation } from 'react-i18next';
import { useHistoryStore } from '../store/useHistoryStore';
import { useGameStore } from '../store/useGameStore';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import i18n from '../utils/i18n';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const History = () => {
    const { t } = useTranslation();
    const { games, clearHistory, getGameById } = useHistoryStore();
    const { setGameState, players, currentPlayerIndex, gameStarted, gameEnded } = useGameStore();
    const navigate = useNavigate();
    const [currentGameId, setCurrentGameId] = useState<string | null>(null);

    useEffect(() => {
        // Si une partie est en cours, on la sauvegarde dans l'historique
        if (gameStarted && !gameEnded && players.length > 0) {
            // On vérifie si une partie en cours existe déjà
            const existingUnfinishedGame = games.find(game => !game.isFinished);

            if (!existingUnfinishedGame) {
                // Si aucune partie en cours n'existe, on en crée une nouvelle
                const newGameId = Date.now().toString();
                setCurrentGameId(newGameId);
                useHistoryStore.getState().addUnfinishedGame(players.map(player => ({
                    name: player.name,
                    score: player.score,
                    throws: [...player.throws],
                })));
            } else {
                // Si une partie en cours existe, on la met à jour
                setCurrentGameId(existingUnfinishedGame.id);
                useHistoryStore.getState().addUnfinishedGame(players.map(player => ({
                    name: player.name,
                    score: player.score,
                    throws: [...player.throws],
                })));
            }
        }
    }, [players, currentPlayerIndex, gameStarted, gameEnded]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const locale = i18n.language === 'fr' ? fr : enUS;
        return format(date, 'PPP', { locale });
    };

    const handleResumeGame = (gameId: string) => {
        const game = getGameById(gameId);
        if (game && !game.isFinished) {
            setGameState({
                players: game.players.map(player => ({
                    id: Date.now().toString(),
                    name: player.name,
                    score: player.score,
                    throws: [...player.throws],
                    consecutiveZeros: 0,
                    isEliminated: false,
                })),
                currentPlayerIndex: 0,
                gameStarted: true,
                gameEnded: false,
                winner: null,
            });
            setCurrentGameId(gameId);
            navigate('/game');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">{t('history.title')}</h1>
                        {games.length > 0 && (
                            <button
                                onClick={clearHistory}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                            >
                                {t('history.clear')}
                            </button>
                        )}
                    </div>

                    {games.length === 0 ? (
                        <p className="text-gray-600 text-center">{t('history.empty')}</p>
                    ) : (
                        <div className="space-y-6">
                            {games.map((game) => (
                                <div
                                    key={game.id}
                                    className={`border rounded-lg p-4 ${game.isFinished
                                            ? 'bg-gray-50'
                                            : game.id === currentGameId
                                                ? 'bg-blue-100 border-blue-300'
                                                : 'bg-blue-50'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                {t('history.game')} - {formatDate(game.date)}
                                            </h2>
                                            {!game.isFinished && (
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                                    {t('history.unfinished')}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {!game.isFinished && game.id !== currentGameId && (
                                                <button
                                                    onClick={() => handleResumeGame(game.id)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                                                >
                                                    {t('history.resume')}
                                                </button>
                                            )}
                                            {game.isFinished && game.winner && (
                                                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                                    {t('history.winner')}: {game.winner.name} ({game.winner.score})
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {game.players.map((player) => (
                                            <div
                                                key={player.name}
                                                className={`flex justify-between items-center p-2 rounded ${game.isFinished && game.winner && player.name === game.winner.name
                                                        ? 'bg-green-50'
                                                        : 'bg-gray-50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span>{player.name}</span>
                                                    <div className="flex gap-1 flex-wrap">
                                                        {player.throws.map((throwScore, index) => (
                                                            <div
                                                                key={`${game.id}-${player.name}-${index}`}
                                                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${throwScore === 0
                                                                        ? 'bg-red-500 text-white'
                                                                        : 'bg-green-500 text-white'
                                                                    }`}
                                                            >
                                                                {throwScore}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="font-bold">{player.score}</span>
                                            </div>
                                        ))}
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

export default History; 