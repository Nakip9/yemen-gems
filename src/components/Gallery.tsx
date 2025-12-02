import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { useLanguage } from './Layout';
import { content, destinations } from '../lib/data';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

// Custom Arrow Components
const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="hidden md:block absolute -right-12 top-1/2 -translate-y-1/2 z-10 text-neutral-dark/50 hover:text-primary transition-colors"
            aria-label="Next Slide"
        >
            <ChevronRight size={40} />
        </button>
    );
};

const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="hidden md:block absolute -left-12 top-1/2 -translate-y-1/2 z-10 text-neutral-dark/50 hover:text-primary transition-colors"
            aria-label="Previous Slide"
        >
            <ChevronLeft size={40} />
        </button>
    );
};

const Gallery: React.FC = () => {
    const { language, dir } = useLanguage();
    const t = content[language].gallery;

    // Use all destinations for the home slider
    const galleryImages = destinations.map(d => ({ src: d.image, alt: d.name[language] }));

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: '0px',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        rtl: dir === 'rtl',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: false,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                    arrows: false, // Explicitly disable arrows in settings for mobile
                }
            }
        ]
    };

    return (
        <section id="gallery" className="py-20 bg-neutral-light overflow-hidden">
            <div className="container mx-auto px-4 md:px-12"> {/* Adjusted padding */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">{t.title}</h2>
                    <p className="text-neutral-dark/70 text-lg mb-8">{t.subtitle}</p>
                </motion.div>

                <div className="mb-12">
                    <Slider {...settings} className="home-gallery-slider pb-8">
                        {galleryImages.map((img, index) => (
                            <div key={index} className="px-3 outline-none">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg group">
                                    <OptimizedImage
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-full"
                                    />
                                    {/* Gradient always visible on mobile, hover on desktop */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <span className="text-white font-bold text-lg">{img.alt}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="text-center">
                    <Link
                        to="/gallery"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-white rounded-full font-bold hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg"
                    >
                        {language === 'ar' ? 'عرض المعرض الكامل' : 'View Full Gallery'}
                        <ArrowRight size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
