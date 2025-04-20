import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { Navbar } from './components/Navbar';
import { useThemeStore } from './store/useThemeStore';
import { useEffect } from 'react';

function App() {
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
