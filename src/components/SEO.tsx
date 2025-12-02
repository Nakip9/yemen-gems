import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from './Layout';

interface SEOProps {
    title?: string;
    description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
    const { language } = useLanguage();

    const defaultTitle = language === 'ar' ? 'جواهر اليمن - اكتشف جمال اليمن' : 'Yemen Gems - Discover the Beauty of Yemen';
    const defaultDescription = language === 'ar'
        ? 'استكشف أفضل الوجهات السياحية في اليمن، من جزيرة سقطرى إلى صنعاء القديمة. خطط لرحلتك معنا.'
        : 'Explore the best tourist destinations in Yemen, from Socotra Island to Old Sana\'a. Plan your trip with us.';

    const fullTitle = title ? `${title} | ${language === 'ar' ? 'جواهر اليمن' : 'Yemen Gems'}` : defaultTitle;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
        </Helmet>
    );
};

export default SEO;
