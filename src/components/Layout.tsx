import React, { createContext, useState, useContext, useEffect } from 'react';
import { Language } from '../lib/data';

interface LayoutProps {
    children: React.ReactNode;
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a Layout');
    }
    return context;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ar');
    const dir = language === 'ar' ? 'rtl' : 'ltr';

    useEffect(() => {
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
    }, [dir, language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, dir }}>
            <div className={`min-h-screen bg-neutral-light text-neutral-dark font-sans ${language === 'ar' ? 'font-arabic' : ''}`}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export default Layout;
