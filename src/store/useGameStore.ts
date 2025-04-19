import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useHistoryStore } from './useHistoryStore';
import { useStatsStore } from './useStatsStore';

interface Player {
    id: string;
    name: string;
    score: number;
    throws: number[];
    consecutiveZeros: number;
    isEliminated: boolean;
}

interface GameRules {
    maxScore: number;
    overScorePenalty: number; // Score auquel on revient en cas de dépassement
    maxConsecutiveZeros: number; // Nombre de zéros consécutifs avant élimination
    eliminationEnabled: boolean; // Activer/désactiver l'élimination
    resetScoreOnMaxZeros: boolean;
}

interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    rules: GameRules;
    gameStarted: boolean;
    gameEnded: boolean;
    winner: Player | null;
    addPlayer: (name: string) => void;
    removePlayer: (id: string) => void;
    addScore: (score: number) => void;
    startGame: () => void;
    resetGame: () => void;
    resetGameState: () => void;
    setRules: (rules: Partial<GameRules>) => void;
    setGameState: (state: {
        players: Player[];
        currentPlayerIndex: number;
        gameStarted: boolean;
        gameEnded: boolean;
        winner: Player | null;
    }) => void;
    saveUnfinishedGame: () => void;
}

const defaultRules: GameRules = {
    maxScore: 50,
    overScorePenalty: 25,
    eliminationEnabled: true,
    maxConsecutiveZeros: 3,
    resetScoreOnMaxZeros: false,
};

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            players: [],
            currentPlayerIndex: 0,
            rules: defaultRules,
            gameStarted: false,
            gameEnded: false,
            winner: null,
            addPlayer: (name) =>
                set((state) => ({
                    players: [
                        ...state.players,
                        {
                            id: Date.now().toString(),
                            name,
                            score: 0,
                            throws: [],
                            consecutiveZeros: 0,
                            isEliminated: false,
                        },
                    ],
                })),
            removePlayer: (id) =>
                set((state) => ({
                    players: state.players.filter((player) => player.id !== id),
                })),
            addScore: (score) =>
                set((state) => {
                    if (!state.gameStarted || state.gameEnded) return state;

                    const newPlayers = [...state.players];
                    const currentPlayer = newPlayers[state.currentPlayerIndex];

                    // Si le joueur est éliminé, on passe au suivant
                    if (currentPlayer.isEliminated) {
                        return {
                            currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
                        };
                    }

                    // Gestion des zéros consécutifs
                    if (score === 0) {
                        currentPlayer.consecutiveZeros += 1;
                        if (currentPlayer.consecutiveZeros >= state.rules.maxConsecutiveZeros) {
                            if (state.rules.eliminationEnabled) {
                                currentPlayer.isEliminated = true;
                            } else if (state.rules.resetScoreOnMaxZeros) {
                                currentPlayer.score = 0;
                                currentPlayer.consecutiveZeros = 0;
                            }
                        }
                    } else {
                        currentPlayer.consecutiveZeros = 0;
                    }

                    // Mise à jour du score
                    const newScore = currentPlayer.score + score;

                    // Vérification du score maximum
                    if (newScore > state.rules.maxScore) {
                        currentPlayer.score = state.rules.overScorePenalty;
                    } else if (newScore === state.rules.maxScore) {
                        currentPlayer.score = newScore;
                        const winner = currentPlayer;
                        useHistoryStore.getState().addGame(
                            { name: winner.name, score: winner.score },
                            newPlayers.map(p => ({ name: p.name, score: p.score, throws: p.throws }))
                        );
                        useStatsStore.getState().updateStats(
                            { name: winner.name, score: winner.score },
                            newPlayers.map(p => ({ name: p.name, score: p.score, throws: p.throws }))
                        );
                        return {
                            players: newPlayers,
                            gameEnded: true,
                            winner,
                        };
                    } else {
                        currentPlayer.score = newScore;
                    }

                    currentPlayer.throws.push(score);

                    // Passage au joueur suivant
                    let nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;

                    // On cherche le prochain joueur non éliminé
                    while (newPlayers[nextPlayerIndex].isEliminated && nextPlayerIndex !== state.currentPlayerIndex) {
                        nextPlayerIndex = (nextPlayerIndex + 1) % state.players.length;
                    }

                    // Si tous les joueurs sont éliminés sauf un, ce joueur gagne
                    const activePlayers = newPlayers.filter(p => !p.isEliminated);
                    if (activePlayers.length === 1) {
                        const winner = activePlayers[0];
                        useHistoryStore.getState().addGame(
                            { name: winner.name, score: winner.score },
                            newPlayers.map(p => ({ name: p.name, score: p.score, throws: p.throws }))
                        );
                        useStatsStore.getState().updateStats(
                            { name: winner.name, score: winner.score },
                            newPlayers.map(p => ({ name: p.name, score: p.score, throws: p.throws }))
                        );
                        return {
                            players: newPlayers,
                            gameEnded: true,
                            winner,
                        };
                    }

                    return {
                        players: newPlayers,
                        currentPlayerIndex: nextPlayerIndex,
                    };
                }),
            startGame: () => set({ gameStarted: true, gameEnded: false, winner: null }),
            resetGame: () =>
                set({
                    players: [],
                    currentPlayerIndex: 0,
                    gameStarted: false,
                    gameEnded: false,
                    winner: null,
                }),
            resetGameState: () =>
                set((state) => ({
                    currentPlayerIndex: 0,
                    gameStarted: false,
                    gameEnded: false,
                    winner: null,
                    players: state.players.map(player => ({
                        ...player,
                        score: 0,
                        throws: [],
                        consecutiveZeros: 0,
                        isEliminated: false,
                    })),
                })),
            setRules: (newRules) =>
                set((state) => ({
                    rules: { ...state.rules, ...newRules },
                })),
            setGameState: (state) => set(state),
            saveUnfinishedGame: () =>
                set((state) => {
                    if (state.gameStarted && !state.gameEnded) {
                        useHistoryStore.getState().addUnfinishedGame(
                            state.players.map(p => ({ name: p.name, score: p.score, throws: p.throws }))
                        );
                    }
                    return state;
                }),
        }),
        {
            name: 'molkky-storage',
        }
    )
); 