import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './Layout';
import { content } from '../lib/data';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, MapPin } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const AboutTeaser: React.FC = () => {
    const { language, dir } = useLanguage();
    const t = content[language].aboutTeaser;

    const stats = [
        { icon: Star, value: '4.9', label: language === 'ar' ? 'تقييم الزوار' : 'Guest Rating' },
        { icon: Users, value: '5k+', label: language === 'ar' ? 'سائح سعيد' : 'Happy Tourists' },
        { icon: MapPin, value: '20+', label: language === 'ar' ? 'وجهة سياحية' : 'Destinations' },
    ];

    return (
        <section id="about-teaser" className="py-12 md:py-20 bg-neutral-light relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Hero Card - Immersive Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-6 shadow-lg group"
                >
                    <OptimizedImage
                        src="/images/shibam_hadramout_1764603231216.webp"
                        alt="Yemen Architecture"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                        <span className="inline-block px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-full text-sm font-bold mb-4">
                            {language === 'ar' ? 'من نحن' : 'Who We Are'}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
                            {t.title}
                        </h2>
                        <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                            {t.subtitle}
                        </p>
                    </div>
                </motion.div>

                {/* Stats Row - Swipeable on Mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 scrollbar-hide">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                                className="snap-center flex-shrink-0 w-[calc(33.333%-10px)] min-w-[140px] md:flex-1 bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <stat.icon className="w-10 h-10 text-primary mb-3" />
                                <h4 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-1">{stat.value}</h4>
                                <p className="text-neutral-dark/60 text-xs md:text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Content Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl p-8 md:p-10 shadow-sm"
                >
                    <p className="text-neutral-dark/70 text-lg leading-relaxed mb-8">
                        {t.description}
                    </p>

                    <Link
                        to="/about"
                        className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl w-full md:w-auto justify-center"
                    >
                        {t.cta}
                        <ArrowRight className={`transition-transform group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutTeaser;
