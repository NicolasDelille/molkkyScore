import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ClockIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const navItems = [
        { path: '/', icon: HomeIcon, label: t('home.newGame') },
        { path: '/history', icon: ClockIcon, label: t('home.history') },
        { path: '/stats', icon: ChartBarIcon, label: t('home.stats') },
        { path: '/settings', icon: Cog6ToothIcon, label: t('home.settings') },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-around">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex flex-col items-center py-2 px-4 ${isActive(item.path)
                                        ? 'text-blue-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Icon className="h-6 w-6" />
                                <span className="text-xs mt-1">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 