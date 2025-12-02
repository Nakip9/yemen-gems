import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/Layout';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
    const { language } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-light text-center px-4">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl md:text-4xl font-bold text-neutral-dark mb-6">
                {language === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
            </h2>
            <p className="text-neutral-dark/60 text-lg mb-8 max-w-md">
                {language === 'ar'
                    ? 'عذراً، الصفحة التي تبحث عنها قد تكون نقلت أو حذفت.'
                    : 'Sorry, the page you are looking for might have been moved or deleted.'}
            </p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105"
            >
                <Home size={20} />
                {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
        </div>
    );
};

export default NotFound;
