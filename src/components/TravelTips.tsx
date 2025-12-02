import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './Layout';
import { content, travelTips } from '../lib/data';
import * as Icons from 'lucide-react';

const TravelTips: React.FC = () => {
    const { language } = useLanguage();
    const t = content[language].tips;

    return (
        <section id="tips" className="py-20 bg-neutral-light">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">{t.title}</h2>
                    <p className="text-neutral-dark/70 text-lg">{t.subtitle}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {travelTips.map((tip, index) => {
                        // Dynamically get icon component
                        const IconComponent = (Icons as any)[tip.icon] || Icons.Info;

                        return (
                            <motion.div
                                key={tip.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-neutral-200/50"
                            >
                                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4">
                                    <IconComponent size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-neutral-dark">{tip.title[language]}</h3>
                                <p className="text-neutral-dark/70 leading-relaxed">
                                    {tip.content[language]}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TravelTips;
