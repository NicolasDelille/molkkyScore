import { useTranslation } from 'react-i18next';
import { useGameStore } from '../store/useGameStore';

const Settings = () => {
    const { t } = useTranslation();
    const { rules, setRules } = useGameStore();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">{t('settings.title')}</h1>

            <div className="space-y-6">
                {/* Score maximum */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">{t('settings.maxScore')}</h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="range"
                            min="25"
                            max="100"
                            step="5"
                            value={rules.maxScore}
                            onChange={(e) => setRules({ maxScore: parseInt(e.target.value) })}
                            className="w-full"
                        />
                        <span className="text-lg font-medium">{rules.maxScore}</span>
                    </div>
                </div>

                {/* Score de pénalité */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">{t('settings.overScorePenalty')}</h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="5"
                            value={rules.overScorePenalty}
                            onChange={(e) => setRules({ overScorePenalty: parseInt(e.target.value) })}
                            className="w-full"
                        />
                        <span className="text-lg font-medium">{rules.overScorePenalty}</span>
                    </div>
                </div>

                {/* Élimination */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">{t('settings.elimination')}</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>{t('settings.eliminationEnabled')}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={rules.eliminationEnabled}
                                    onChange={(e) => setRules({ eliminationEnabled: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span>{t('settings.maxConsecutiveZeros')}</span>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={rules.maxConsecutiveZeros}
                                onChange={(e) => setRules({ maxConsecutiveZeros: parseInt(e.target.value) })}
                                className="w-20 px-2 py-1 border rounded"
                            />
                        </div>

                        {!rules.eliminationEnabled && (
                            <div className="flex items-center justify-between">
                                <span>{t('settings.resetScoreOnMaxZeros', { count: rules.maxConsecutiveZeros })}</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={rules.resetScoreOnMaxZeros}
                                        onChange={(e) => setRules({ resetScoreOnMaxZeros: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings; 