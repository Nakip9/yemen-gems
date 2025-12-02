import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../components/Layout';
import { content, destinations } from '../lib/data';
import { MapPin, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import HeroCarousel from '../components/HeroCarousel';

const DestinationsPage: React.FC = () => {
    const { language } = useLanguage();
    const t = content[language].destinations;

    const heroImages = [
        '/images/socotra_dragon_tree_1764603178352.webp',
        '/images/shibam_hadramout_1764603231216.webp',
        '/images/almukalla_harbor_1764603566692.webp'
    ];

    return (
        <div className="bg-neutral-light dark:bg-neutral-900 transition-colors duration-300 min-h-screen">
            <SEO
                title={language === 'ar' ? 'الوجهات' : 'Destinations'}
                description={language === 'ar' ? 'اكتشف وجهات اليمن الساحرة وتاريخها العريق.' : 'Discover Yemen\'s enchanting destinations and ancient history.'}
            />

            {/* Hero Carousel */}
            <HeroCarousel
                images={heroImages}
                title={t.title}
                subtitle={t.subtitle}
            />

            <div className="container mx-auto px-4 py-20">
                <div className="space-y-24">
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
                        >
                            {/* Image Side */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                                    <img
                                        src={dest.image}
                                        alt={dest.name[language]}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                                    <div className="absolute bottom-6 left-6 right-6 text-white">
                                        <div className="flex items-center gap-2 mb-2 text-accent font-bold tracking-wider uppercase">
                                            <MapPin size={18} />
                                            <span>Yemen</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2">
                                <h2 className="text-3xl md:text-5xl font-bold text-neutral-dark dark:text-white mb-6">
                                    {dest.name[language]}
                                </h2>
                                <p className="text-xl text-neutral-dark/80 dark:text-gray-300 leading-relaxed mb-8">
                                    {dest.description[language]}
                                </p>

                                <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg border-l-4 border-primary relative overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <BookOpen size={100} className="text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                        <BookOpen size={24} />
                                        {language === 'ar' ? 'قصة من التاريخ' : 'History & Stories'}
                                    </h3>
                                    <p className="text-neutral-dark/70 dark:text-gray-300 leading-relaxed relative z-10">
                                        {dest.story ? dest.story[language] : (language === 'ar' ? 'قصة هذا المكان قيد الكتابة...' : 'The story of this place is being written...')}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DestinationsPage;
