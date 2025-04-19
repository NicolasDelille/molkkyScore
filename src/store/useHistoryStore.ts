import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameHistory {
    id: string;
    date: string;
    isFinished: boolean;
    winner?: {
        name: string;
        score: number;
    };
    players: {
        name: string;
        score: number;
        throws: number[];
    }[];
}

interface HistoryState {
    games: GameHistory[];
    addGame: (winner: { name: string; score: number }, players: { name: string; score: number; throws: number[] }[]) => void;
    addUnfinishedGame: (players: { name: string; score: number; throws: number[] }[]) => void;
    clearHistory: () => void;
    getGameById: (id: string) => GameHistory | undefined;
}

export const useHistoryStore = create<HistoryState>()(
    persist(
        (set, get) => ({
            games: [],
            addGame: (winner, players) =>
                set((state) => ({
                    games: [
                        {
                            id: Date.now().toString(),
                            date: new Date().toISOString(),
                            isFinished: true,
                            winner,
                            players,
                        },
                        ...state.games,
                    ],
                })),
            addUnfinishedGame: (players) =>
                set((state) => {
                    // On cherche une partie non terminée existante
                    const existingUnfinishedGameIndex = state.games.findIndex(game => !game.isFinished);

                    if (existingUnfinishedGameIndex !== -1) {
                        // Si on trouve une partie non terminée, on la met à jour
                        const updatedGames = [...state.games];
                        updatedGames[existingUnfinishedGameIndex] = {
                            ...updatedGames[existingUnfinishedGameIndex],
                            players,
                            date: new Date().toISOString(),
                        };
                        return { games: updatedGames };
                    } else {
                        // Sinon, on crée une nouvelle partie non terminée
                        return {
                            games: [
                                {
                                    id: Date.now().toString(),
                                    date: new Date().toISOString(),
                                    isFinished: false,
                                    players,
                                },
                                ...state.games,
                            ],
                        };
                    }
                }),
            clearHistory: () => set({ games: [] }),
            getGameById: (id) => get().games.find(game => game.id === id),
        }),
        {
            name: 'molkky-history',
        }
    )
); 