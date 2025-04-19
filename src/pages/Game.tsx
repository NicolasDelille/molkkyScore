import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../store/useGameStore';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Game = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { players, addPlayer, removePlayer, addScore, startGame, gameStarted, currentPlayerIndex, gameEnded } = useGameStore();
    const [newPlayerName, setNewPlayerName] = useState('');
    const [isScoreExpanded, setIsScoreExpanded] = useState(true);
    const [selectedScore, setSelectedScore] = useState<number | null>(null);

    useEffect(() => {
        if (gameEnded) {
            navigate('/winner');
        }
    }, [gameEnded, navigate]);

    const handleAddPlayer = () => {
        if (newPlayerName.trim()) {
            addPlayer(newPlayerName.trim());
            setNewPlayerName('');
        }
    };

    const handleScoreClick = (score: number) => {
        setSelectedScore(score);
    };

    const handleValidateScore = () => {
        if (selectedScore !== null) {
            addScore(selectedScore);
            setSelectedScore(null);
        }
    };

    return (
        <div className="w-full">
            {!gameStarted ? (
                <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
                    <h2 className="text-2xl font-bold mb-4">{t('game.addPlayer')}</h2>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newPlayerName}
                            onChange={(e) => setNewPlayerName(e.target.value)}
                            placeholder={t('game.playerName')}
                            className="flex-1 p-2 border rounded"
                        />
                        <button
                            onClick={handleAddPlayer}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {t('game.addPlayer')}
                        </button>
                    </div>

                    <div className="space-y-2">
                        {players.map((player) => (
                            <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span>{player.name}</span>
                                <button
                                    onClick={() => removePlayer(player.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    {players.length > 0 && (
                        <button
                            onClick={startGame}
                            className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                        >
                            {t('game.startGame')}
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-2 sm:gap-4">
                    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <div className="flex justify-between items-center mb-2 sm:mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold">{t('game.score')}</h2>
                            <button
                                onClick={() => setIsScoreExpanded(!isScoreExpanded)}
                                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-transform duration-200"
                            >
                                {isScoreExpanded ? (
                                    <ChevronUpIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                                ) : (
                                    <ChevronDownIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                                )}
                            </button>
                        </div>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isScoreExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="space-y-1 sm:space-y-2">
                                {players.map((player, index) => (
                                    <div
                                        key={player.id}
                                        className={`p-2 rounded ${index === currentPlayerIndex
                                            ? 'bg-blue-100 border-2 border-blue-500'
                                            : player.isEliminated
                                                ? 'bg-red-100 border-2 border-red-500'
                                                : 'bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <span>{player.name}</span>
                                                    {index === currentPlayerIndex && (
                                                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                                                            {t('game.currentPlayer')}
                                                        </span>
                                                    )}
                                                    {player.isEliminated && (
                                                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                                                            {t('game.eliminated')}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="font-bold">{player.score}</span>
                                            </div>
                                            <div className="flex gap-1 flex-wrap">
                                                {player.throws.map((throwScore, throwIndex) => (
                                                    <div
                                                        key={throwIndex}
                                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${throwScore === 0
                                                            ? 'bg-red-500 text-white'
                                                            : 'bg-green-500 text-white'
                                                            }`}
                                                    >
                                                        {throwScore}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                            {t('game.throw')} - {players[currentPlayerIndex]?.name}
                        </h2>
                        <div className="flex flex-col items-center gap-2 sm:gap-4">
                            <div className="flex gap-2 sm:gap-4">
                                <button
                                    onClick={() => handleScoreClick(7)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 7
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    7
                                </button>
                                <button
                                    onClick={() => handleScoreClick(9)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 9
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    9
                                </button>
                                <button
                                    onClick={() => handleScoreClick(8)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 8
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    8
                                </button>
                            </div>
                            <div className="flex gap-2 sm:gap-4">
                                <button
                                    onClick={() => handleScoreClick(5)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 5
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    5
                                </button>
                                <button
                                    onClick={() => handleScoreClick(11)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 11
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    11
                                </button>
                                <button
                                    onClick={() => handleScoreClick(12)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 12
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    12
                                </button>
                                <button
                                    onClick={() => handleScoreClick(6)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 6
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    6
                                </button>
                            </div>
                            <div className="flex gap-2 sm:gap-4">
                                <button
                                    onClick={() => handleScoreClick(3)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 3
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    3
                                </button>
                                <button
                                    onClick={() => handleScoreClick(10)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 10
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    10
                                </button>
                                <button
                                    onClick={() => handleScoreClick(4)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 4
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    4
                                </button>
                            </div>
                            <div className="flex gap-2 sm:gap-4">
                                <button
                                    onClick={() => handleScoreClick(1)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 1
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    1
                                </button>
                                <button
                                    onClick={() => handleScoreClick(2)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 2
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    2
                                </button>
                            </div>
                            <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-4">
                                <button
                                    onClick={() => handleScoreClick(0)}
                                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-base sm:text-xl ${selectedScore === 0
                                        ? 'bg-red-600 text-white'
                                        : 'bg-red-500 text-white hover:bg-red-600'
                                        }`}
                                >
                                    0
                                </button>
                            </div>
                            {selectedScore !== null && (
                                <button
                                    onClick={handleValidateScore}
                                    className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    {t('game.validateScore', { score: selectedScore })}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game; 