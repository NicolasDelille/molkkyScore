import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../store/useThemeStore';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export const Navbar = () => {
    const { t } = useTranslation();
    const { isDark, toggleTheme } = useThemeStore();

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link
                            to="/"
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {t('app.title')}
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
                            aria-label={isDark ? t('theme.light') : t('theme.dark')}
                        >
                            {isDark ? (
                                <SunIcon className="h-6 w-6" />
                            ) : (
                                <MoonIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}; 