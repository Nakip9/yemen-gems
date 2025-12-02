import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useLanguage } from './Layout';
import { content, destinations } from '../lib/data';
import { ArrowRight, MapPin, BookOpen, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Destinations: React.FC = () => {
    const { language, dir } = useLanguage();
    const t = content[language].destinations;
    const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null);

    return (
        <section id="destinations" className="py-20 bg-neutral-light dark:bg-neutral-900 transition-colors duration-300 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">{t.title}</h2>
                    <p className="text-neutral-dark/70 dark:text-gray-300 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest, index) => (
                        <Tilt key={dest.id} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={1000}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative h-[450px] rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white dark:bg-neutral-800 flex flex-col border border-transparent dark:border-neutral-700"
                                onClick={() => setSelectedDest(dest)}
                            >
                                {/* Image Section */}
                                <div className="relative h-2/3 overflow-hidden">
                                    <img
                                        src={dest.image}
                                        alt={dest.name[language]}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <div className="flex items-center gap-2 mb-1 text-accent">
                                            <MapPin size={16} />
                                            <span className="text-xs font-medium uppercase tracking-wider">Yemen</span>
                                        </div>
                                        <h3 className="text-2xl font-bold">{dest.name[language]}</h3>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex flex-col justify-between flex-1 relative z-10 bg-white dark:bg-neutral-800 transition-colors duration-300">
                                    <p className="text-neutral-dark/80 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                                        {dest.description[language]}
                                    </p>

                                    {/* Blog/Story Preview */}
                                    <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-700">
                                        <div className="flex items-center gap-2 text-primary text-sm font-bold mb-2">
                                            <BookOpen size={16} />
                                            <span>{language === 'ar' ? 'قصص من المكان' : 'Stories from here'}</span>
                                        </div>
                                        <p className="text-xs text-neutral-dark/60 dark:text-gray-400 line-clamp-1">
                                            {language === 'ar'
                                                ? 'اكتشف الأساطير والتاريخ العريق لهذه المنطقة...'
                                                : 'Discover the legends and ancient history of this region...'}
                                        </p>
                                    </div>

                                    <button
                                        className="absolute top-[-20px] right-6 bg-primary text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-20"
                                        aria-label="View Details"
                                    >
                                        <ArrowRight size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
                                    </button>
                                </div>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>
            </div>

            {/* Quick View Modal */}
            <AnimatePresence>
                {selectedDest && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDest(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10"
                        >
                            <button
                                onClick={() => setSelectedDest(null)}
                                className="absolute top-4 right-4 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="h-64 relative">
                                <img
                                    src={selectedDest.image}
                                    alt={selectedDest.name[language]}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <h3 className="text-3xl font-bold mb-2">{selectedDest.name[language]}</h3>
                                    <div className="flex items-center gap-2 text-accent">
                                        <MapPin size={18} />
                                        <span className="text-sm font-medium uppercase tracking-wider">Yemen</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <p className="text-lg text-neutral-dark/80 dark:text-gray-300 leading-relaxed mb-8">
                                    {selectedDest.description[language]}
                                </p>

                                <div className="flex justify-end">
                                    <Link
                                        to="/destinations"
                                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold transition-transform hover:scale-105"
                                    >
                                        {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                                        <ArrowRight size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Destinations;
