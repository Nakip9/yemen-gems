import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../components/Layout';
import { Shield, Eye, Cookie, Users, Lock, Mail } from 'lucide-react';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
    const { language } = useLanguage();

    const sections = language === 'ar' ? [
        {
            icon: Shield,
            title: 'جمع البيانات',
            content: 'نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند التسجيل أو الحجز أو الاتصال بنا. قد تشمل هذه المعلومات الاسم والبريد الإلكتروني ورقم الهاتف وتفاصيل الدفع.'
        },
        {
            icon: Eye,
            title: 'استخدام البيانات',
            content: 'نستخدم معلوماتك لتوفير وتحسين خدماتنا، ومعالجة الحجوزات، والتواصل معك بشأن رحلاتك، وإرسال التحديثات والعروض الترويجية (مع موافقتك).'
        },
        {
            icon: Cookie,
            title: 'ملفات تعريف الارتباط',
            content: 'نستخدم ملفات تعريف الارتباط والتقنيات المماثلة لتحسين تجربة المستخدم وتحليل حركة المرور على الموقع. يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك.'
        },
        {
            icon: Users,
            title: 'مشاركة البيانات',
            content: 'لا نبيع معلوماتك الشخصية. قد نشارك البيانات مع مقدمي الخدمات الموثوق بهم (مثل معالجات الدفع) فقط لتقديم خدماتنا.'
        },
        {
            icon: Lock,
            title: 'أمن البيانات',
            content: 'نطبق تدابير أمنية صناعية قياسية لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الكشف أو التغيير أو التدمير.'
        },
        {
            icon: Mail,
            title: 'حقوقك',
            content: 'لديك الحق في الوصول إلى بياناتك الشخصية وتصحيحها وحذفها. للممارسة هذه الحقوق، يرجى الاتصال بنا على info@yemengems.com.'
        }
    ] : [
        {
            icon: Shield,
            title: 'Data Collection',
            content: 'We collect information you provide directly when registering, booking, or contacting us. This may include name, email, phone number, and payment details.'
        },
        {
            icon: Eye,
            title: 'Data Usage',
            content: 'We use your information to provide and improve our services, process bookings, communicate about your trips, and send updates and promotional offers (with your consent).'
        },
        {
            icon: Cookie,
            title: 'Cookies',
            content: 'We use cookies and similar technologies to enhance user experience and analyze site traffic. You can control cookies through your browser settings.'
        },
        {
            icon: Users,
            title: 'Data Sharing',
            content: 'We do not sell your personal information. We may share data with trusted service providers (like payment processors) only to deliver our services.'
        },
        {
            icon: Lock,
            title: 'Data Security',
            content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.'
        },
        {
            icon: Mail,
            title: 'Your Rights',
            content: 'You have the right to access, correct, and delete your personal data. To exercise these rights, please contact us at info@yemengems.com.'
        }
    ];

    return (
        <div className="pt-24 pb-20 bg-neutral-light dark:bg-neutral-900 transition-colors duration-300 min-h-screen">
            <SEO
                title={language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                description={language === 'ar' ? 'سياسة الخصوصية لجواهر اليمن' : 'Yemen Gems Privacy Policy'}
            />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-center">
                        {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                    </h1>
                    <p className="text-neutral-dark/70 dark:text-gray-400 text-center mb-12 text-lg">
                        {language === 'ar'
                            ? 'آخر تحديث: ديسمبر 2024'
                            : 'Last Updated: December 2024'}
                    </p>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 mb-12 rounded-lg">
                        <p className="text-neutral-dark dark:text-gray-300 font-medium">
                            {language === 'ar'
                                ? '⚠️ هذا نموذج لسياسة الخصوصية. يجب عليك استشارة محامٍ لإنشاء سياسة خصوصية قانونية صالحة لعملك.'
                                : '⚠️ This is a template privacy policy. You must consult with a lawyer to create a legally valid privacy policy for your business.'}
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
                                    <div className="bg-primary/10 p-3 rounded-full shrink-0">
                                        <section.icon size={24} className="text-primary" />
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

                    <div className="mt-12 p-6 bg-primary/5 dark:bg-primary/10 rounded-xl">
                        <p className="text-neutral-dark dark:text-gray-300 text-center">
                            {language === 'ar'
                                ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على '
                                : 'If you have any questions about this Privacy Policy, please contact us at '}
                            <a href="mailto:info@yemengems.com" className="text-primary font-bold hover:underline">
                                info@yemengems.com
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
