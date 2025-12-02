import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './Layout';
import { content } from '../lib/data';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const Hero: React.FC = () => {
    const { language, dir } = useLanguage();
    const heroSlides = content[language].hero;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [heroSlides.length, isAutoPlaying]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
        setIsAutoPlaying(false); // Pause on interaction
    }, [heroSlides.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
        setIsAutoPlaying(false);
    }, [heroSlides.length]);

    // Swipe handlers
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
            {/* Background Carousel with Ken Burns Effect */}
            <AnimatePresence mode='popLayout'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                    // Swipe logic
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            dir === 'rtl' ? prevSlide() : nextSlide();
                        } else if (swipe > swipeConfidenceThreshold) {
                            dir === 'rtl' ? nextSlide() : prevSlide();
                        }
                    }}
                >
                    <OptimizedImage
                        src={heroSlides[currentIndex].image}
                        alt={heroSlides[currentIndex].title}
                        className="w-full h-full object-cover"
                        priority={true} // Always eager load the current hero image
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows (Hidden on Mobile) */}
            <button
                onClick={dir === 'rtl' ? nextSlide : prevSlide}
                className="absolute left-4 z-20 text-white/50 hover:text-white transition-colors p-3 hidden md:block hover:bg-white/10 rounded-full backdrop-blur-sm"
                aria-label="Previous Slide"
            >
                <ChevronLeft size={48} />
            </button>
            <button
                onClick={dir === 'rtl' ? prevSlide : nextSlide}
                className="absolute right-4 z-20 text-white/50 hover:text-white transition-colors p-3 hidden md:block hover:bg-white/10 rounded-full backdrop-blur-sm"
                aria-label="Next Slide"
            >
                <ChevronRight size={48} />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            setIsAutoPlaying(false);
                        }}
                        className={`h-2 rounded-full transition-all duration-500 ${index === currentIndex ? 'bg-primary w-8' : 'bg-white/50 w-2 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-white pointer-events-none"> {/* pointer-events-none to allow swiping through text area, but need to enable for buttons */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl mx-auto pointer-events-auto" // Re-enable pointer events for buttons
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-shadow-lg tracking-tight">
                            {heroSlides[currentIndex].title}
                        </h1>

                        <p className="text-xl md:text-2xl mb-10 text-white/90 font-light leading-relaxed drop-shadow-md">
                            {heroSlides[currentIndex].subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="#destinations"
                                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-primary/30"
                            >
                                {heroSlides[currentIndex].cta_primary}
                            </a>
                            <a
                                href="#gallery"
                                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg transition-all hover:scale-105"
                            >
                                {heroSlides[currentIndex].cta_secondary}
                            </a>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors cursor-pointer z-20"
                onClick={() => document.getElementById('about-teaser')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};

export default Hero;
