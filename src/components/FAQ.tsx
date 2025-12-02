import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './Layout';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
    const { language } = useLanguage();
    // We need to add FAQ data to data.ts. For now, I'll use local data or placeholders until data.ts is updated.
    const t = {
        title: language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions',
        subtitle: language === 'ar' ? 'إجابات على استفساراتك' : 'Answers to your common questions'
    };

    const faqs = [
        {
            question: { ar: 'هل اليمن آمن للسياحة؟', en: 'Is Yemen safe for tourism?' },
            answer: {
                ar: 'نعم، هناك مناطق آمنة تماماً للسياحة مثل جزيرة سقطرى وحضرموت والمهرة. نحن ننظم رحلات فقط للمناطق الآمنة والمستقرة.',
                en: 'Yes, there are completely safe areas for tourism like Socotra Island, Hadramout, and Al-Mahrah. We organize trips only to safe and stable regions.'
            }
        },
        {
            question: { ar: 'كيف يمكنني الحصول على التأشيرة؟', en: 'How can I get a visa?' },
            answer: {
                ar: 'نحن نساعدك في استخراج التأشيرة السياحية. تتطلب العملية عادة صورة جواز السفر وبعض المعلومات الأساسية، وتستغرق حوالي أسبوع.',
                en: 'We assist you in obtaining a tourist visa. The process usually requires a passport copy and some basic information, taking about one week.'
            }
        },
        {
            question: { ar: 'ما هي العملة المستخدمة؟', en: 'What is the currency used?' },
            answer: {
                ar: 'الريال اليمني. يفضل إحضار الدولار الأمريكي (طبعة جديدة) للصرف.',
                en: 'The Yemeni Rial. It is preferred to bring US Dollars (new print) for exchange.'
            }
        },
        {
            question: { ar: 'هل تتوفر خدمة الإنترنت؟', en: 'Is internet service available?' },
            answer: {
                ar: 'نعم، تتوفر خدمة الإنترنت 4G في معظم المدن الرئيسية، والإنترنت الفضائي في سقطرى.',
                en: 'Yes, 4G internet service is available in most major cities, and satellite internet in Socotra.'
            }
        }
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 bg-neutral-light dark:bg-neutral-900 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">{t.title}</h2>
                    <p className="text-neutral-dark/70 dark:text-gray-300 text-lg">{t.subtitle}</p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between text-start hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <HelpCircle className="text-secondary flex-shrink-0" size={24} />
                                    <span className="text-lg font-bold text-neutral-dark dark:text-white">
                                        {faq.question[language]}
                                    </span>
                                </div>
                                {activeIndex === index ? (
                                    <ChevronUp className="text-primary" />
                                ) : (
                                    <ChevronDown className="text-neutral-dark/50 dark:text-gray-400" />
                                )}
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-neutral-dark/80 dark:text-gray-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-700">
                                            {faq.answer[language]}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
