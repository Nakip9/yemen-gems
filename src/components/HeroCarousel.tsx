import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { useLanguage } from './Layout';

interface HeroCarouselProps {
    images: string[];
    title: string;
    subtitle: string;
    interval?: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
    images,
    title,
    subtitle,
    interval = 6000
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const { dir } = useLanguage();

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            nextSlide();
        }, interval);

        return () => clearInterval(timer);
    }, [interval, isPaused, nextSlide]);

    // Swipe handlers
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <div
            className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden group touch-pan-y"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            {/* Background Images with Crossfade */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 w-full h-full"
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
                        src={images[currentIndex]}
                        alt={`Hero Slide ${currentIndex + 1}`}
                        className="w-full h-full"
                        priority={true}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-20 text-center px-4 pointer-events-none"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{title}</h1>
                <p className="text-white/90 text-lg max-w-2xl mx-auto drop-shadow-md">{subtitle}</p>
            </motion.div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
