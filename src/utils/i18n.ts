import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from '../../i18n/fr.json';
import en from '../../i18n/en.json';

// Configuration de débogage
const debug = process.env.NODE_ENV === 'development';

// Configuration de base
const config = {
    resources: {
        fr: { translation: fr },
        en: { translation: en },
    },
    lng: 'fr',
    fallbackLng: 'fr',
    debug,
    interpolation: {
        escapeValue: false,
    },
    react: {
        bindI18n: 'languageChanged loaded',
        bindI18nStore: 'added removed',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
        useSuspense: false,
    },
    returnNull: false,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: ',' as const,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    ignoreJSONStructure: true,
};

// Initialisation
i18n
    .use(initReactI18next)
    .init(config)
    .then(() => {
        if (debug) {
            console.log('i18n initialized successfully');
        }
    })
    .catch((error) => {
        console.error('Failed to initialize i18n:', error);
    });

// Gestionnaires d'événements
i18n.on('failedLoading', (lng, ns, msg) => {
    console.error(`Failed loading language ${lng} namespace ${ns}: ${msg}`);
});

i18n.on('missingKey', (lngs, namespace, key) => {
    if (debug) {
        console.warn(`Missing key ${key} in namespace ${namespace} for languages ${lngs}`);
    }
});

export default i18n; 