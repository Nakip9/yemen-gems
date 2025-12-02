import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../components/Layout';
import { content } from '../lib/data';
import { Target, Eye, Heart, Award, Users, Globe, Shield, Zap, Star, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';

const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let startTime: number;
        let animationFrame: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const FlipCard: React.FC<{ front: React.ReactNode; back: React.ReactNode; index: number }> = ({ front, back, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative h-[450px] md:h-[500px] perspective-1000 cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full preserve-3d transition-all duration-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden shadow-2xl">
                    {front}
                    {/* Tap Hint */}
                    <div className="absolute bottom-6 left-0 right-0 text-center z-20">
                        <span className="inline-block px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-white/90 text-sm border border-white/20 animate-pulse">
                            Tap to Flip
                        </span>
                    </div>
                </div>
                {/* Back */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden shadow-2xl rotate-y-180 bg-white dark:bg-neutral-800"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    {back}
                </div>
            </motion.div>
        </motion.div>
    );
};

const About: React.FC = () => {
    const { language } = useLanguage();
    const t = content[language].aboutFull;

    // Dynamic Hero State
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const heroSlides = [
        {
            image: '/images/hero_background_1764603109548.webp',
            title: { ar: 'اكتشف اليمن', en: 'Discover Yemen' },
            subtitle: { ar: 'أرض السعادة والحضارات', en: 'Land of Happiness & Civilizations' }
        },
        {
            image: '/images/shibam_hadramout_1764603231216.webp',
            title: { ar: 'تاريخ عريق', en: 'Ancient History' },
            subtitle: { ar: 'ناطحات سحاب طينية فريدة', en: 'Unique Mud Skyscrapers' }
        },
        {
            image: '/images/socotra_dragon_tree_1764603178352.webp',
            title: { ar: 'طبيعة خلابة', en: 'Stunning Nature' },
            subtitle: { ar: 'جزيرة سقطرى الساحرة', en: 'Enchanting Socotra Island' }
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const stats = [
        { value: 5000, suffix: '+', label: language === 'ar' ? 'زائر سعيد' : 'Happy Visitors', icon: Users, color: 'bg-primary' },
        { value: 20, suffix: '+', label: language === 'ar' ? 'وجهة سياحية' : 'Destinations', icon: MapPin, color: 'bg-secondary' },
        { value: 99, suffix: '%', label: language === 'ar' ? 'رضا العملاء' : 'Satisfaction', icon: Star, color: 'bg-accent' },
        { value: 24, suffix: '/7', label: language === 'ar' ? 'دعم متواصل' : 'Support', icon: Shield, color: 'bg-neutral-dark' }
    ];

    const features = [
        {
            icon: Shield,
            title: { ar: 'السلامة أولاً', en: 'Safety First' },
            description: { ar: 'نضمن سلامتك في كل خطوة مع فرق مرافقة محترفة', en: 'We guarantee your safety at every step with professional escort teams' },
            color: 'bg-gradient-to-br from-secondary to-teal-900', // Emerald/Teal
            accent: 'border-secondary'
        },
        {
            icon: Award,
            title: { ar: 'تجارب فاخرة', en: 'Luxury Experiences' },
            description: { ar: 'رحلات مخصصة تناسب اهتماماتك بأعلى معايير الجودة', en: 'Customized trips to match your interests with highest quality standards' },
            color: 'bg-gradient-to-br from-primary to-red-900', // Ruby/Terracotta
            accent: 'border-primary'
        },
        {
            icon: Zap,
            title: { ar: 'دعم فوري', en: 'Instant Support' },
            description: { ar: 'فريقنا متاح دائماً لمساعدتك في أي وقت ومكان', en: 'Our team is always available to help you anytime, anywhere' },
            color: 'bg-gradient-to-br from-neutral-dark to-slate-900', // Sapphire/Midnight
            accent: 'border-accent'
        }
    ];

    const values = [
        { icon: Award, title: { ar: 'الجودة', en: 'Quality' }, description: { ar: 'نلتزم بتقديم أعلى مستويات الجودة في كل رحلة', en: 'We commit to delivering the highest quality in every journey' } },
        { icon: Users, title: { ar: 'الضيافة', en: 'Hospitality' }, description: { ar: 'نرحب بكم بكرم الضيافة اليمنية الأصيلة', en: 'We welcome you with authentic Yemeni hospitality' } },
        { icon: Globe, title: { ar: 'الاستدامة', en: 'Sustainability' }, description: { ar: 'نحافظ على تراثنا الطبيعي والثقافي للأجيال القادمة', en: 'We preserve our natural and cultural heritage for future generations' } }
    ];

    return (
        <div className="bg-neutral-light dark:bg-neutral-900 transition-colors duration-300 min-h-screen">
            <SEO
                title={language === 'ar' ? 'من نحن' : 'About Us'}
                description={language === 'ar' ? 'تعرف على قصتنا ورؤيتنا.' : 'Learn about our story and vision.'}
            />

            {/* Dynamic Full-Screen Hero */}
            <div className="relative h-screen min-h-[600px] overflow-hidden">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentHeroIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <OptimizedImage
                            src={heroSlides[currentHeroIndex].image}
                            alt="Hero Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                    </motion.div>
                </AnimatePresence>

                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pb-20">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentHeroIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
                                {heroSlides[currentHeroIndex].title[language]}
                            </h1>
                            <p className="text-xl md:text-3xl text-white/90 max-w-2xl mx-auto mb-12 font-light">
                                {heroSlides[currentHeroIndex].subtitle[language]}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Horizontal Scroll Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="w-full max-w-6xl absolute bottom-32 md:bottom-20 left-0 right-0 mx-auto px-4"
                    >
                        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide justify-start md:justify-center">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + (index * 0.1) }}
                                    className="snap-center flex-shrink-0 w-[160px] md:w-[200px]"
                                >
                                    <div className={`${stat.color} p-4 md:p-6 rounded-2xl text-white shadow-lg backdrop-blur-sm bg-opacity-90 border border-white/10`}>
                                        <stat.icon className="w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 opacity-90 mx-auto" />
                                        <div className="text-2xl md:text-4xl font-bold mb-1">
                                            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                        </div>
                                        <p className="text-xs md:text-sm opacity-90">{stat.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">

                {/* Redesigned "Why Choose Us" Features */}
                <div className="mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-neutral-dark dark:text-white mb-12 text-center">
                        {language === 'ar' ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
                    </h2>
                    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide -mx-4 px-4 md:grid md:grid-cols-3 md:gap-8 md:mx-0">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="snap-center flex-shrink-0 w-[300px] md:w-auto"
                            >
                                <div className={`relative ${feature.color} p-8 rounded-[2rem] text-white shadow-xl h-[350px] flex flex-col justify-between overflow-hidden group border-t-4 ${feature.accent}`}>
                                    {/* Abstract Background Shapes */}
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:rotate-6 transition-transform duration-300">
                                            <feature.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold mb-4 leading-tight">{feature.title[language]}</h3>
                                    </div>

                                    <div className="relative z-10">
                                        <p className="text-white/80 text-lg leading-relaxed">{feature.description[language]}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Photo-Based Flip Cards: Mission & Vision */}
                <div className="mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-neutral-dark dark:text-white mb-4 text-center">
                        {language === 'ar' ? 'رسالتنا ورؤيتنا' : 'Our Mission & Vision'}
                    </h2>
                    <p className="text-center text-neutral-dark/60 dark:text-gray-400 mb-12">
                        {language === 'ar' ? 'اضغط على البطاقة' : 'Tap the card to reveal'}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Mission Card */}
                        <FlipCard
                            index={0}
                            front={
                                <div className="relative w-full h-full group">
                                    <OptimizedImage
                                        src="/images/shibam_hadramout_1764603231216.webp"
                                        alt="Mission"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                        <Target size={48} className="mb-4 text-primary" />
                                        <h3 className="text-4xl font-bold mb-2">{t.mission.title}</h3>
                                        <p className="text-white/80 text-sm">{language === 'ar' ? 'بناء جسور الثقافة' : 'Building Cultural Bridges'}</p>
                                    </div>
                                </div>
                            }
                            back={
                                <div className="w-full h-full p-10 flex flex-col justify-center items-center text-center bg-white dark:bg-neutral-800 border-2 border-primary/20 rounded-3xl">
                                    <Target size={64} className="text-primary mb-6" />
                                    <h3 className="text-3xl font-bold text-neutral-dark dark:text-white mb-6">{t.mission.title}</h3>
                                    <p className="text-xl text-neutral-dark/70 dark:text-gray-300 leading-relaxed">{t.mission.description}</p>
                                </div>
                            }
                        />

                        {/* Vision Card */}
                        <FlipCard
                            index={1}
                            front={
                                <div className="relative w-full h-full group">
                                    <OptimizedImage
                                        src="/images/socotra_dragon_tree_1764603178352.webp"
                                        alt="Vision"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                        <Eye size={48} className="mb-4 text-secondary" />
                                        <h3 className="text-4xl font-bold mb-2">{t.vision.title}</h3>
                                        <p className="text-white/80 text-sm">{language === 'ar' ? 'مستقبل السياحة' : 'The Future of Tourism'}</p>
                                    </div>
                                </div>
                            }
                            back={
                                <div className="w-full h-full p-10 flex flex-col justify-center items-center text-center bg-white dark:bg-neutral-800 border-2 border-secondary/20 rounded-3xl">
                                    <Eye size={64} className="text-secondary mb-6" />
                                    <h3 className="text-3xl font-bold text-neutral-dark dark:text-white mb-6">{t.vision.title}</h3>
                                    <p className="text-xl text-neutral-dark/70 dark:text-gray-300 leading-relaxed">{t.vision.description}</p>
                                </div>
                            }
                        />
                    </div>
                </div>

                {/* Values Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <Heart size={40} className="text-accent" />
                        <h2 className="text-3xl md:text-5xl font-bold text-neutral-dark dark:text-white">
                            {t.values.title}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-transparent dark:border-neutral-700 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform" />
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto relative z-10">
                                    <value.icon size={32} className="text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-dark dark:text-white mb-4 text-center relative z-10">
                                    {value.title[language]}
                                </h3>
                                <p className="text-neutral-dark/70 dark:text-gray-300 text-center leading-relaxed relative z-10">
                                    {value.description[language]}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
