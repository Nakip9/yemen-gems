import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './Layout';
import { useTheme } from './ThemeContext';
import { content } from '../lib/data';

const Navbar: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const t = content[language].nav;
    const location = useLocation();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'en' : 'ar');
    };

    // Define links with paths
    const navLinks = [
        { name: t.home, path: '/' },
        { name: t.destinations, path: '/destinations' }, // New dedicated page
        { name: t.gallery, path: '/gallery' },
        { name: t.about, path: '/about' }, // Localized name
        { name: t.contact, path: '/contact' }, // New dedicated page
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                ? 'glass shadow-lg py-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center relative z-50">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                    <img src="/images/yemen_gems_logo_1764603069831.webp" alt="Logo" className="h-10 w-10 object-contain" />
                    <span className={isScrolled || isMobileMenuOpen ? 'text-neutral-dark dark:text-white' : 'text-white'}>
                        {language === 'ar' ? 'جواهر اليمن' : 'Yemen Gems'}
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? 'text-neutral-dark dark:text-gray-200' : 'text-white/90'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-all ${isScrolled
                            ? 'text-neutral-dark dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            : 'text-white hover:bg-white/20'
                            }`}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={toggleLanguage}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${isScrolled
                            ? 'border-primary text-primary hover:bg-primary hover:text-white'
                            : 'border-white/50 text-white hover:bg-white/20'
                            }`}
                    >
                        <Globe size={16} />
                        <span className="text-xs font-bold">{language === 'ar' ? 'EN' : 'عربي'}</span>
                    </button>

                    <Link
                        to="/contact"
                        className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105 shadow-lg"
                    >
                        {t.book}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`md:hidden p-2 rounded-lg z-50 relative ${isScrolled || isMobileMenuOpen ? 'text-neutral-dark dark:text-white' : 'text-white'
                        }`}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 shadow-xl border-t border-neutral-100 dark:border-neutral-800 md:hidden flex flex-col p-6 gap-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-lg font-medium text-neutral-dark dark:text-white hover:text-primary transition-colors py-2 border-b border-neutral-50 dark:border-neutral-800 last:border-0"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex items-center justify-between mt-4">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 text-lg font-medium text-neutral-dark dark:text-white"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                <span>{theme === 'dark' ? (language === 'ar' ? 'الوضع النهاري' : 'Light Mode') : (language === 'ar' ? 'الوضع الليلي' : 'Dark Mode')}</span>
                            </button>

                            <button
                                onClick={() => {
                                    toggleLanguage();
                                }}
                                className="flex items-center gap-2 text-lg font-medium text-neutral-dark dark:text-white"
                            >
                                <Globe size={20} />
                                <span>{language === 'ar' ? 'English' : 'العربية'}</span>
                            </button>
                        </div>

                        <Link
                            to="/contact"
                            className="bg-primary text-white py-3 rounded-xl text-center font-bold text-lg shadow-md mt-2"
                        >
                            {t.book}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
