import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            title: "Email Phishing Analyzer",
            likelihood: "Phishing Likelihood",
            summary: "Summary",
            advice: "Advice",
            analyze: "Analyze",
            placeholder: "Paste the suspicious email content here",
        },
    },
    he: {
        translation: {
            title: "בודק מיילים חשודים לפישינג",
            likelihood: "סבירות לפישינג",
            summary: "סיכום",
            advice: "המלצות",
            analyze: "נתח",
            placeholder: "הדבק כאן את תוכן המייל החשוד",
        },
    },
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
