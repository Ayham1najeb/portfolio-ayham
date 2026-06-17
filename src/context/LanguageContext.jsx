import React, { createContext, useState, useEffect, useContext } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext(null);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === null) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    // Default to 'ar'
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage ? savedLanguage : 'ar';
    });

    // Update document direction when language changes
    useEffect(() => {
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => {
            if (prev === 'ar') return 'en';
            if (prev === 'en') return 'tr';
            return 'ar';
        });
    };

    // Translation helper function
    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
