import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useLanguage } from '../components/Layout';
import { destinations } from '../lib/data';
import SEO from '../components/SEO';

const GalleryPage: React.FC = () => {
    const { language } = useLanguage();

    // Duplicate images to create a fuller gallery feel
    const galleryImages = [...destinations, ...destinations].map((d, i) => ({
        id: i,
        src: d.image,
        alt: d.name[language],
        caption: d.description[language]
    }));

    return (
        <div className="pt-24 pb-20 bg-neutral-dark min-h-screen text-white">
            <SEO
                title={language === 'ar' ? 'معرض الصور' : 'Gallery'}
                description={language === 'ar' ? 'شاهد أجمل صور اليمن.' : 'View the most beautiful photos of Yemen.'}
            />
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
                        {language === 'ar' ? 'معرض الصور' : 'Photo Gallery'}
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        {language === 'ar' ? 'استكشف جمال اليمن بعدسة فنية' : 'Explore the beauty of Yemen through an artistic lens'}
                    </p>
                </motion.div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {galleryImages.map((img, index) => (
                        <Tilt key={img.id} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={1000}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    loading="lazy"
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-bold text-primary mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {img.alt}
                                    </h3>
                                    <p className="text-sm text-white/80 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        {img.caption}
                                    </p>
                                </div>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;
