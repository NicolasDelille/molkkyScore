import { useEffect } from 'react';
import i18n from '../utils/i18n';

const DebugI18n = () => {
    useEffect(() => {
        const handleMissingKey = (lngs: string[], namespace: string, key: string) => {
            console.warn(`Missing translation for key: ${key} in namespace: ${namespace} for languages: ${lngs}`);
        };

        i18n.on('missingKey', handleMissingKey);

        return () => {
            i18n.off('missingKey', handleMissingKey);
        };
    }, []);

    return null;
};

export default DebugI18n; 