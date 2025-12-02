import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../components/Layout';
import { FileText, AlertCircle, CreditCard, Ban, Scale, Phone } from 'lucide-react';
import SEO from '../components/SEO';

const TermsConditions: React.FC = () => {
    const { language } = useLanguage();

    const sections = language === 'ar' ? [
        {
            icon: FileText,
            title: 'قبول الشروط',
            content: 'باستخدام موقعنا وخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.'
        },
        {
            icon: AlertCircle,
            title: 'مسؤوليات المستخدم',
            content: 'أنت مسؤول عن تقديم معلومات دقيقة وكاملة عند الحجز. يجب عليك الامتثال لجميع القوانين واللوائح المحلية أثناء رحلتك.'
        },
        {
            icon: CreditCard,
            title: 'الحجز والدفع',
            content: 'جميع الحجوزات تخضع للتوافر. الأسعار قابلة للتغيير دون إشعار مسبق. الدفع الكامل مطلوب عند الحجز ما لم يُنص على خلاف ذلك.'
        },
        {
            icon: Ban,
            title: 'الإلغاء والاسترداد',
            content: 'سياسة الإلغاء تختلف حسب نوع الخدمة. الإلغاءات قبل 30 يومًا من تاريخ السفر قد تكون مؤهلة لاسترداد كامل. يرجى الاتصال بنا للحصول على التفاصيل.'
        },
        {
            icon: Scale,
            title: 'حدود المسؤولية',
            content: 'نحن لسنا مسؤولين عن أي خسائر أو أضرار غير مباشرة أو عرضية. مسؤوليتنا محدودة بالمبلغ المدفوع مقابل الخدمة.'
        },
        {
            icon: Phone,
            title: 'اتصل بنا',
            content: 'لأي أسئلة حول هذه الشروط، يرجى الاتصال بنا على info@yemengems.com أو +967 1 234 567.'
        }
    ] : [
        {
            icon: FileText,
            title: 'Acceptance of Terms',
            content: 'By using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, please do not use our services.'
        },
        {
            icon: AlertCircle,
            title: 'User Responsibilities',
            content: 'You are responsible for providing accurate and complete information when booking. You must comply with all local laws and regulations during your trip.'
        },
        {
            icon: CreditCard,
            title: 'Booking and Payment',
            content: 'All bookings are subject to availability. Prices are subject to change without prior notice. Full payment is required at the time of booking unless otherwise stated.'
        },
        {
            icon: Ban,
            title: 'Cancellation and Refunds',
            content: 'Cancellation policy varies by service type. Cancellations made 30+ days before travel date may be eligible for full refund. Please contact us for details.'
        },
        {
            icon: Scale,
            title: 'Limitation of Liability',
            content: 'We are not liable for any indirect, incidental, or consequential losses or damages. Our liability is limited to the amount paid for the service.'
        },
        {
            icon: Phone,
            title: 'Contact Us',
            content: 'For any questions about these terms, please contact us at info@yemengems.com or +967 1 234 567.'
        }
    ];

    return (
        <div className="pt-24 pb-20 bg-neutral-light dark:bg-neutral-900 transition-colors duration-300 min-h-screen">
            <SEO
                title={language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
                description={language === 'ar' ? 'الشروط والأحكام لجواهر اليمن' : 'Yemen Gems Terms & Conditions'}
            />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-center">
                        {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
                    </h1>
                    <p className="text-neutral-dark/70 dark:text-gray-400 text-center mb-12 text-lg">
                        {language === 'ar'
                            ? 'آخر تحديث: ديسمبر 2024'
                            : 'Last Updated: December 2024'}
                    </p>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 mb-12 rounded-lg">
                        <p className="text-neutral-dark dark:text-gray-300 font-medium">
                            {language === 'ar'
                                ? '⚠️ هذا نموذج للشروط والأحكام. يجب عليك استشارة محامٍ لإنشاء شروط وأحكام قانونية صالحة لعملك.'
                                : '⚠️ This is a template for Terms & Conditions. You must consult with a lawyer to create legally valid terms for your business.'}
                        </p>
                    </div>

                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg border border-neutral-100 dark:border-neutral-700"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-secondary/10 p-3 rounded-full shrink-0">
                                        <section.icon size={24} className="text-secondary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-neutral-dark dark:text-white mb-4">
                                            {section.title}
                                        </h2>
                                        <p className="text-neutral-dark/70 dark:text-gray-300 leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-secondary/5 dark:bg-secondary/10 rounded-xl">
                        <p className="text-neutral-dark dark:text-gray-300 text-center">
                            {language === 'ar'
                                ? 'إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على '
                                : 'If you have any questions about these Terms, please contact us at '}
                            <a href="mailto:info@yemengems.com" className="text-secondary font-bold hover:underline">
                                info@yemengems.com
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsConditions;
