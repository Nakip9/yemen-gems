import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from './Layout';
import { content, socialLinks } from '../lib/data';
import { Link } from 'react-router-dom';
import WhatsAppIcon from './WhatsAppIcon';

const Footer: React.FC = () => {
    const { language } = useLanguage();
    const nav = content[language].nav;

    const quickLinks = [
        { path: "/", name: nav.home },
        { path: "/destinations", name: nav.destinations },
        { path: "/gallery", name: nav.gallery },
        { path: "/about", name: nav.about },
        { path: "/contact", name: nav.contact },
    ];

    const contactInfo = {
        address: language === 'ar' ? 'شارع حدة، صنعاء، اليمن' : 'Haddah St, Sana\'a, Yemen',
        phone: '+967 1 234 567',
        email: 'info@yemengems.com',
    };

    return (
        <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 pt-16 pb-8 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                            <img src="/images/yemen_gems_logo_1764603069831.webp" alt="Logo" className="h-10 w-10 object-contain" />
                            <span className="text-neutral-dark dark:text-white">
                                {language === 'ar' ? 'جواهر اليمن' : 'Yemen Gems'}
                            </span>
                        </Link>
                        <p className="text-neutral-dark/70 dark:text-gray-400 leading-relaxed">
                            {language === 'ar'
                                ? 'نأخذك في رحلة لا تُنسى لاستكشاف كنوز اليمن الطبيعية والتاريخية.'
                                : 'We take you on an unforgettable journey to explore Yemen\'s natural and historical treasures.'}
                        </p>
                        <div className="flex gap-4">
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-dark dark:text-gray-300 transition-all hover:bg-[#1877F2] hover:text-white hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-dark dark:text-gray-300 transition-all hover:bg-[#E4405F] hover:text-white hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href={socialLinks.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-dark dark:text-gray-300 transition-all hover:bg-[#25D366] hover:text-white hover:scale-110"
                                aria-label="WhatsApp"
                            >
                                <WhatsAppIcon size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-6">
                            {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
                        </h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-neutral-dark/70 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-6">
                            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-neutral-dark/70 dark:text-gray-400">
                                <MapPin size={20} className="text-primary shrink-0 mt-1" />
                                <span>{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-dark/70 dark:text-gray-400">
                                <Phone size={20} className="text-primary shrink-0" />
                                <span dir="ltr">{contactInfo.phone}</span>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-dark/70 dark:text-gray-400">
                                <Mail size={20} className="text-primary shrink-0" />
                                <span>{contactInfo.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Book Now CTA */}
                    <div>
                        <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-6">
                            {language === 'ar' ? 'جاهز للمغامرة؟' : 'Ready for Adventure?'}
                        </h3>
                        <p className="text-neutral-dark/70 dark:text-gray-400 mb-6">
                            {language === 'ar' ? 'احجز رحلتك الآن واستمتع بتجربة فريدة.' : 'Book your trip now and enjoy a unique experience.'}
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 shadow-lg"
                        >
                            {language === 'ar' ? 'احجز الآن' : 'Book Now'}
                        </Link>
                    </div>
                </div>

                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-dark/60 dark:text-gray-500 text-sm text-center md:text-start">
                        © {new Date().getFullYear()} {language === 'ar' ? 'جواهر اليمن. جميع الحقوق محفوظة.' : 'Yemen Gems. All rights reserved.'}
                    </p>
                    <div className="flex gap-6 text-sm text-neutral-dark/60 dark:text-gray-500">
                        <Link to="/privacy" className="hover:text-primary transition-colors">
                            {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                        </Link>
                        <Link to="/terms" className="hover:text-primary transition-colors">
                            {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
