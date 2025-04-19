import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerStats {
    name: string;
    gamesPlayed: number;
    gamesWon: number;
    totalScore: number;
    averageScore: number;
    bestScore: number;
    worstScore: number;
    totalThrows: number;
    successfulThrows: number;
    accuracy: number;
    consecutiveZeros: number;
    eliminations: number;
}

interface StatsState {
    players: Record<string, PlayerStats>;
    updateStats: (winner: { name: string; score: number }, players: { name: string; score: number; throws: number[] }[]) => void;
    clearStats: () => void;
}

export const useStatsStore = create<StatsState>()(
    persist(
        (set) => ({
            players: {},
            updateStats: (winner, players) => {
                console.log('Updating stats with winner:', winner);
                console.log('And players:', players);
                set((state) => {
                    const newPlayers = { ...state.players };
                    console.log('Current stats:', state.players);

                    players.forEach((player) => {
                        const existingStats = newPlayers[player.name] || {
                            name: player.name,
                            gamesPlayed: 0,
                            gamesWon: 0,
                            totalScore: 0,
                            averageScore: 0,
                            bestScore: 0,
                            worstScore: Infinity,
                            totalThrows: 0,
                            successfulThrows: 0,
                            accuracy: 0,
                            consecutiveZeros: 0,
                            eliminations: 0,
                        };

                        // Mise à jour des statistiques
                        existingStats.gamesPlayed += 1;
                        existingStats.gamesWon += player.name === winner.name ? 1 : 0;
                        existingStats.totalScore += player.score;
                        existingStats.averageScore = existingStats.totalScore / existingStats.gamesPlayed;
                        existingStats.bestScore = Math.max(existingStats.bestScore, player.score);
                        existingStats.worstScore = Math.min(existingStats.worstScore, player.score);
                        existingStats.totalThrows += player.throws.length;
                        existingStats.successfulThrows += player.throws.filter(t => t > 0).length;
                        existingStats.accuracy = existingStats.successfulThrows / existingStats.totalThrows;
                        existingStats.consecutiveZeros = Math.max(
                            existingStats.consecutiveZeros,
                            player.throws.reduce((max, t, i, arr) => {
                                if (t === 0) {
                                    const next = arr[i + 1];
                                    if (next === 0) {
                                        return max + 1;
                                    }
                                }
                                return max;
                            }, 0)
                        );
                        existingStats.eliminations += player.throws.filter(t => t === 0).length >= 3 ? 1 : 0;

                        newPlayers[player.name] = existingStats;
                    });

                    console.log('New stats:', newPlayers);
                    return { players: newPlayers };
                });
            },
            clearStats: () => {
                console.log('Clearing stats');
                set({ players: {} });
            },
        }),
        {
            name: 'molkky-stats',
            onRehydrateStorage: () => (state) => {
                console.log('Stats store rehydrated:', state);
            },
        }
    )
); 