import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../components/Layout';
import { content } from '../lib/data';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, MessageCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import FAQ from '../components/FAQ';

const ContactPage: React.FC = () => {
    const { language, dir } = useLanguage();
    const t = content[language].contact;
    const form = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

    // Conversational Form State
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        interests: [] as string[],
        message: ''
    });

    // Parallax effect for hero
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    const totalSteps = 4;

    const interests = [
        { id: 'culture', label: { ar: 'الثقافة والتاريخ', en: 'Culture & History' }, icon: '🏛️' },
        { id: 'nature', label: { ar: 'الطبيعة والمغامرة', en: 'Nature & Adventure' }, icon: '🏔️' },
        { id: 'food', label: { ar: 'الطعام التقليدي', en: 'Traditional Food' }, icon: '🍽️' },
        { id: 'photography', label: { ar: 'التصوير الفوتوغرافي', en: 'Photography' }, icon: '📸' }
    ];

    const handleInterestToggle = (id: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(id)
                ? prev.interests.filter(i => i !== id)
                : [...prev.interests, id]
        }));
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1: return formData.user_name.trim().length > 0;
            case 2: return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email);
            case 3: return formData.interests.length > 0;
            case 4: return formData.message.trim().length > 0;
            default: return false;
        }
    };

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Rate Limiting (Client-side)
        const now = Date.now();
        if (now - lastSubmitTime < 60000) {
            alert(language === 'ar' ? 'يرجى الانتظار قبل إرسال رسالة أخرى.' : 'Please wait before sending another message.');
            return;
        }

        // 2. Honeypot Check (Anti-Spam)
        const honeypot = (e.target as HTMLFormElement).website_url.value;
        if (honeypot) {
            console.log("Bot detected!");
            return;
        }

        if (!form.current) return;

        setIsSubmitting(true);

        // Create a temporary form with all data
        const formElement = form.current;
        const messageField = formElement.querySelector('[name="message"]') as HTMLTextAreaElement;
        if (messageField) {
            messageField.value = `Name: ${formData.user_name}\nEmail: ${formData.user_email}\nInterests: ${formData.interests.join(', ')}\n\nMessage:\n${formData.message}`;
        }

        emailjs.sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE_ID!,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
            formElement,
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
        )
            .then((result) => {
                console.log(result.text);
                setSubmitStatus('success');
                setIsSubmitting(false);
                setLastSubmitTime(Date.now());

                // Trigger confetti
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 }
                });

                // Reset form
                setFormData({ user_name: '', user_email: '', interests: [], message: '' });
                setCurrentStep(1);

                // Reset status after 5 seconds
                setTimeout(() => setSubmitStatus('idle'), 5000);
            }, (error) => {
                console.log(error.text);
                setSubmitStatus('error');
                setIsSubmitting(false);
            });
    };

    const renderStep = () => {
        const slideVariants = {
            enter: (direction: number) => ({
                x: direction > 0 ? 50 : -50,
                opacity: 0
            }),
            center: {
                x: 0,
                opacity: 1
            },
            exit: (direction: number) => ({
                x: direction < 0 ? 50 : -50,
                opacity: 0
            })
        };

        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-2xl font-bold text-neutral-dark dark:text-white mb-4">
                                {language === 'ar' ? '👋 ما هو اسمك؟' : '👋 What\'s your name?'}
                            </label>
                            <input
                                type="text"
                                value={formData.user_name}
                                onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                                onKeyPress={(e) => e.key === 'Enter' && canProceed() && setCurrentStep(2)}
                                className="w-full px-6 py-4 text-lg rounded-xl bg-neutral-light dark:bg-neutral-900 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-neutral-800 focus:ring-0 transition-all dark:text-white"
                                placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                                autoFocus
                            />
                        </div>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        key="step2"
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-2xl font-bold text-neutral-dark dark:text-white mb-4">
                                {language === 'ar' ? `📧 رائع ${formData.user_name}! كيف يمكننا التواصل معك؟` : `📧 Great ${formData.user_name}! How can we reach you?`}
                            </label>
                            <input
                                type="email"
                                value={formData.user_email}
                                onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                                onKeyPress={(e) => e.key === 'Enter' && canProceed() && setCurrentStep(3)}
                                className="w-full px-6 py-4 text-lg rounded-xl bg-neutral-light dark:bg-neutral-900 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-neutral-800 focus:ring-0 transition-all dark:text-white"
                                placeholder={language === 'ar' ? 'اسمك@example.com' : 'your@email.com'}
                                autoFocus
                            />
                        </div>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        key="step3"
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-2xl font-bold text-neutral-dark dark:text-white mb-4">
                                {language === 'ar' ? '🌍 ما الذي يثير اهتمامك؟' : '🌍 What interests you?'}
                            </label>
                            <p className="text-neutral-dark/60 dark:text-gray-400 mb-6">
                                {language === 'ar' ? 'اختر واحدة أو أكثر' : 'Choose one or more'}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {interests.map((interest) => (
                                    <motion.button
                                        key={interest.id}
                                        type="button"
                                        onClick={() => handleInterestToggle(interest.id)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`p-6 rounded-xl border-2 transition-all ${formData.interests.includes(interest.id)
                                            ? 'border-primary bg-primary/10 dark:bg-primary/20'
                                            : 'border-neutral-200 dark:border-neutral-700 hover:border-primary/50'
                                            }`}
                                    >
                                        <div className="text-4xl mb-2">{interest.icon}</div>
                                        <div className="font-bold text-neutral-dark dark:text-white text-sm">
                                            {interest.label[language]}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );

            case 4:
                return (
                    <motion.div
                        key="step4"
                        custom={1}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-2xl font-bold text-neutral-dark dark:text-white mb-4">
                                {language === 'ar' ? '💭 أخبرنا المزيد...' : '💭 Tell us more...'}
                            </label>
                            <p className="text-neutral-dark/60 dark:text-gray-400 mb-6">
                                {language === 'ar' ? 'ما الذي تود معرفته؟ أو صف رحلتك المثالية' : 'What would you like to know? Or describe your ideal trip'}
                            </p>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={6}
                                className="w-full px-6 py-4 text-lg rounded-xl bg-neutral-light dark:bg-neutral-900 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-neutral-800 focus:ring-0 transition-all resize-none dark:text-white"
                                placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                                autoFocus
                            />
                        </div>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-neutral-light dark:bg-neutral-900 transition-colors duration-300 min-h-screen">
            <SEO
                title={language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                description={language === 'ar' ? 'تواصل مع فريق جواهر اليمن.' : 'Contact the Yemen Gems team.'}
            />

            {/* Cinematic Hero Section */}
            <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
                {/* Background Image with Parallax */}
                <motion.div
                    style={{ y: heroY }}
                    className="absolute inset-0 w-full h-[120%]"
                >
                    <OptimizedImage
                        src="/images/aden_coast_1764603413447.webp"
                        alt="Contact Us"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-neutral-light dark:to-neutral-900" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />

                {/* Hero Content */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm md:text-base font-bold mb-6"
                        >
                            {language === 'ar' ? '✨ دعنا نخطط لمغامرتك' : '✨ Let\'s Plan Your Adventure'}
                        </motion.span>

                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                            {language === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
                        </h1>

                        <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
                            {language === 'ar'
                                ? 'نحن هنا لتحويل حلمك إلى رحلة لا تُنسى'
                                : 'We\'re here to turn your dream into an unforgettable journey'}
                        </p>

                        {/* Quick Contact Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            <motion.a
                                href={`https://wa.me/${t.info.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                            >
                                <MessageCircle size={20} />
                                <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                            </motion.a>

                            <motion.a
                                href={`mailto:${t.info.email}`}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold hover:bg-white/20 transition-all"
                            >
                                <Mail size={20} />
                                <span>{language === 'ar' ? 'إيميل' : 'Email'}</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-sm opacity-80">{language === 'ar' ? 'مرر للأسفل' : 'Scroll Down'}</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Interactive Contact Cards */}
                        <div className="space-y-6">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-3xl font-bold text-neutral-dark dark:text-white mb-8"
                            >
                                {language === 'ar' ? 'تواصل معنا مباشرة' : 'Connect Instantly'}
                            </motion.h2>

                            {/* WhatsApp Card */}
                            <motion.a
                                href={`https://wa.me/${t.info.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="block bg-gradient-to-br from-[#25D366] to-[#128C7E] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                                        <MessageCircle size={32} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-1">
                                            {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                                        </h3>
                                        <p className="text-white/90 font-medium" dir="ltr">{t.info.phone}</p>
                                        <p className="text-white/70 text-sm mt-1">
                                            {language === 'ar' ? 'اضغط للدردشة الفورية' : 'Tap for instant chat'}
                                        </p>
                                    </div>
                                    <div className="text-white/50 group-hover:translate-x-1 transition-transform">
                                        →
                                    </div>
                                </div>
                            </motion.a>

                            {/* Email Card */}
                            <motion.a
                                href={`mailto:${t.info.email}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="block bg-gradient-to-br from-accent to-orange-600 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                                        <Mail size={32} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-1">
                                            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                                        </h3>
                                        <p className="text-white/90 font-medium break-all">{t.info.email}</p>
                                        <p className="text-white/70 text-sm mt-1">
                                            {language === 'ar' ? 'اضغط لإرسال إيميل' : 'Tap to send email'}
                                        </p>
                                    </div>
                                    <div className="text-white/50 group-hover:translate-x-1 transition-transform">
                                        →
                                    </div>
                                </div>
                            </motion.a>

                            {/* Location Card */}
                            <motion.a
                                href={t.info.googleMaps}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="block bg-gradient-to-br from-primary to-red-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/20 p-4 rounded-xl group-hover:scale-110 transition-transform">
                                        <MapPin size={32} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-1">
                                            {language === 'ar' ? 'موقعنا' : 'Our Location'}
                                        </h3>
                                        <p className="text-white/90 font-medium">{t.info.address}</p>
                                        <p className="text-white/70 text-sm mt-1">
                                            {language === 'ar' ? 'اضغط للحصول على الاتجاهات' : 'Tap for directions'}
                                        </p>
                                    </div>
                                    <div className="text-white/50 group-hover:translate-x-1 transition-transform">
                                        →
                                    </div>
                                </div>
                            </motion.a>
                        </div>

                        {/* Conversational Form */}
                        <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 relative overflow-hidden">
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-neutral-dark dark:text-white">
                                        {language === 'ar' ? `الخطوة ${currentStep} من ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
                                    </span>
                                    <span className="text-sm text-neutral-dark/60 dark:text-gray-400">
                                        {Math.round((currentStep / totalSteps) * 100)}%
                                    </span>
                                </div>
                                <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary to-secondary"
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>

                            <form ref={form} onSubmit={sendEmail} className="space-y-6 relative z-10">
                                {/* Honeypot Field (Hidden) */}
                                <input name="website_url" type="text" className="hidden" tabIndex={-1} autoComplete="off" />

                                {/* Hidden fields for EmailJS */}
                                <input type="hidden" name="user_name" value={formData.user_name} />
                                <input type="hidden" name="user_email" value={formData.user_email} />
                                <textarea name="message" className="hidden" value={formData.message} readOnly />

                                {/* Animated Steps */}
                                <AnimatePresence mode="wait">
                                    {renderStep()}
                                </AnimatePresence>

                                {/* Navigation Buttons */}
                                <div className="flex gap-4 pt-4">
                                    {currentStep > 1 && (
                                        <motion.button
                                            type="button"
                                            onClick={() => setCurrentStep(currentStep - 1)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 py-4 rounded-xl font-bold text-neutral-dark dark:text-white bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all flex items-center justify-center gap-2"
                                        >
                                            <ChevronLeft size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
                                            {language === 'ar' ? 'السابق' : 'Back'}
                                        </motion.button>
                                    )}

                                    {currentStep < totalSteps ? (
                                        <motion.button
                                            type="button"
                                            onClick={() => canProceed() && setCurrentStep(currentStep + 1)}
                                            disabled={!canProceed()}
                                            whileHover={canProceed() ? { scale: 1.02 } : {}}
                                            whileTap={canProceed() ? { scale: 0.98 } : {}}
                                            className={`flex-1 py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${canProceed()
                                                ? 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl'
                                                : 'bg-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {language === 'ar' ? 'التالي' : 'Next'}
                                            <ChevronRight size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            type="submit"
                                            disabled={!canProceed() || isSubmitting}
                                            whileHover={canProceed() && !isSubmitting ? { scale: 1.02 } : {}}
                                            whileTap={canProceed() && !isSubmitting ? { scale: 0.98 } : {}}
                                            className={`flex-1 py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${canProceed() && !isSubmitting
                                                ? 'bg-gradient-to-r from-primary to-secondary hover:shadow-xl shadow-lg'
                                                : 'bg-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <span className="animate-pulse">
                                                    {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                                                </span>
                                            ) : (
                                                <>
                                                    <Send size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
                                                    {language === 'ar' ? 'إرسال' : 'Send'}
                                                </>
                                            )}
                                        </motion.button>
                                    )}
                                </div>

                                {/* Status Messages */}
                                <AnimatePresence>
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800"
                                        >
                                            <CheckCircle size={20} />
                                            <span>
                                                {language === 'ar'
                                                    ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
                                                    : 'Message sent successfully! We will contact you soon.'}
                                            </span>
                                        </motion.div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800"
                                        >
                                            <AlertCircle size={20} />
                                            <span>
                                                {language === 'ar'
                                                    ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.'
                                                    : 'An error occurred. Please try again later.'}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Map Section */}
            <div className="container mx-auto px-4 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-700 h-[400px] relative group"
                >
                    <iframe
                        title="Yemen Gems Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61883.36467773248!2d44.15287663125001!3d15.353333300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1603db9885f6390b%3A0x4dd02e779c43e798!2sSana&#39;a%2C%20Yemen!5e0!3m2!1sen!2s!4v1709666000000!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale group-hover:grayscale-0 transition-all duration-700"
                    ></iframe>

                    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 transform transition-transform group-hover:scale-105">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-neutral-dark dark:text-white mb-1">
                                    {language === 'ar' ? 'قم بزيارتنا' : 'Visit Our Office'}
                                </h3>
                                <p className="text-sm text-neutral-dark/70 dark:text-gray-300 leading-relaxed">
                                    {t.info.address}
                                </p>
                                <a
                                    href={t.info.googleMaps}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary text-sm font-bold mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all"
                                >
                                    {language === 'ar' ? 'احصل على الاتجاهات' : 'Get Directions'}
                                    <span className={dir === 'rtl' ? 'rotate-180' : ''}>→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* FAQ Section */}
            <FAQ />
        </div>
    );
};

export default ContactPage;
