export type Language = 'ar' | 'en';

export const content = {
    ar: {
        nav: {
            home: 'الرئيسية',
            destinations: 'الوجهات',
            gallery: 'المعرض',
            about: 'من نحن',
            blog: 'نصائح السفر',
            contact: 'تواصل معنا',
            book: 'احجز الآن',
        },
        hero: [
            {
                title: 'صنعاء القديمة',
                subtitle: 'رحلة عبر الزمن في أقدم المدن المأهولة، حيث يحكي كل حجر قصة.',
                cta_primary: 'احجز رحلتك',
                cta_secondary: 'اكتشف المزيد',
                image: '/images/hero_background_1764603109548.webp',
            },
            {
                title: 'جزيرة سقطرى',
                subtitle: 'عالم آخر من الخيال، موطن شجرة دم الأخوين والطبيعة العذراء.',
                cta_primary: 'استكشف الجزيرة',
                cta_secondary: 'شاهد الصور',
                image: '/images/socotra_dragon_tree_1764603178352.webp',
            },
            {
                title: 'شيبام حضرموت',
                subtitle: 'مانهاتن الصحراء، أول ناطحات سحاب في التاريخ تعانق السماء.',
                cta_primary: 'خطط لزيارتك',
                cta_secondary: 'اقرأ التاريخ',
                image: '/images/shibam_hadramout_1764603231216.webp',
            }
        ],
        aboutTeaser: {
            title: 'مرحباً بكم في جواهر اليمن',
            subtitle: 'بوابتك لاكتشاف أرض السعيدة',
            description: 'نحن أكثر من مجرد وكالة سياحية؛ نحن سفراء لجمال اليمن وتاريخه العريق. نأخذك في رحلة لا تُنسى لاستكشاف الكنوز المخفية، من الجبال الشاهقة إلى الشواطئ الذهبية، مع ضمان تجربة آمنة ومريحة.',
            cta: 'اقرأ قصتنا الكاملة',
        },
        aboutFull: {
            mission: {
                title: 'رسالتنا',
                description: 'تقديم تجربة سياحية استثنائية تبرز الوجه المشرق لليمن، مع الحفاظ على التراث الثقافي والبيئي.',
            },
            vision: {
                title: 'رؤيتنا',
                description: 'أن نكون الخيار الأول للسياح الباحثين عن المغامرة والأصالة في الشرق الأوسط.',
            },
            values: {
                title: 'قيمنا',
                items: [
                    { title: 'الأصالة', desc: 'نقدم تجارب تعكس الثقافة اليمنية الحقيقية.' },
                    { title: 'الأمان', desc: 'سلامة ضيوفنا هي أولويتنا القصوى.' },
                    { title: 'الاستدامة', desc: 'نلتزم بالسياحة المسؤولة التي تحمي البيئة.' },
                ]
            }
        },
        destinations: {
            title: 'وجهات ساحرة',
            subtitle: 'استكشف أجمل المناطق السياحية في اليمن',
            discover: 'اكتشف',
        },
        gallery: {
            title: 'معرض الصور',
            subtitle: 'لمحات من جمال اليمن',
        },
        contact: {
            title: 'تواصل معنا',
            subtitle: 'نحن هنا للإجابة على استفساراتك وتخطيط رحلتك القادمة.',
            form: {
                name: 'الاسم الكامل',
                email: 'البريد الإلكتروني',
                message: 'رسالتك',
                submit: 'إرسال الرسالة',
            },
            info: {
                address: 'شارع حدة، صنعاء، اليمن',
                phone: '+7 999 984 6073',
                email: 'sadeqeissa@gmail.com',
                googleMaps: 'https://www.google.com/maps/search/?api=1&query=Haddah+Street,+Sana\'a,+Yemen',
            }
        },
        tips: {
            title: 'نصائح للمسافرين',
            subtitle: 'كل ما تحتاج معرفته قبل زيارتك',
        },
        footer: {
            about: 'جواهر اليمن',
            description: 'بوابتك الأولى لاستكشاف جمال وتاريخ وحضارة اليمن السعيد.',
            quick_links: 'روابط سريعة',
            contact: 'تواصل معنا',
            copyright: '© 2025 جواهر اليمن. جميع الحقوق محفوظة.',
        },
    },
    en: {
        nav: {
            home: 'Home',
            destinations: 'Destinations',
            gallery: 'Gallery',
            about: 'About Us',
            blog: 'Travel Tips',
            contact: 'Contact',
            book: 'Book Now',
        },
        hero: [
            {
                title: 'Old City of Sana\'a',
                subtitle: 'A journey through time in one of the oldest inhabited cities, where every stone tells a story.',
                cta_primary: 'Book Your Trip',
                cta_secondary: 'Learn More',
                image: '/images/hero_background_1764603109548.webp',
            },
            {
                title: 'Socotra Island',
                subtitle: 'Another world of imagination, home to the Dragon Blood Tree and pristine nature.',
                cta_primary: 'Explore Island',
                cta_secondary: 'View Photos',
                image: '/images/socotra_dragon_tree_1764603178352.webp',
            },
            {
                title: 'Shibam Hadramout',
                subtitle: 'The Manhattan of the Desert, history\'s first skyscrapers embracing the sky.',
                cta_primary: 'Plan Visit',
                cta_secondary: 'Read History',
                image: '/images/shibam_hadramout_1764603231216.webp',
            }
        ],
        aboutTeaser: {
            title: 'Welcome to Yemen Gems',
            subtitle: 'Your Gateway to Arabia Felix',
            description: 'We are more than just a travel agency; we are ambassadors of Yemen\'s beauty and ancient history. We take you on an unforgettable journey to explore hidden treasures, from towering mountains to golden beaches, ensuring a safe and comfortable experience.',
            cta: 'Read Our Full Story',
        },
        aboutFull: {
            mission: {
                title: 'Our Mission',
                description: 'To provide an exceptional tourism experience that highlights the bright side of Yemen, while preserving cultural and environmental heritage.',
            },
            vision: {
                title: 'Our Vision',
                description: 'To be the first choice for tourists seeking adventure and authenticity in the Middle East.',
            },
            values: {
                title: 'Our Values',
                items: [
                    { title: 'Authenticity', desc: 'We offer experiences that reflect true Yemeni culture.' },
                    { title: 'Safety', desc: 'The safety of our guests is our top priority.' },
                    { title: 'Sustainability', desc: 'We are committed to responsible tourism that protects the environment.' },
                ]
            }
        },
        destinations: {
            title: 'Enchanting Destinations',
            subtitle: 'Explore the most beautiful tourist spots in Yemen',
            discover: 'Discover',
        },
        gallery: {
            title: 'Photo Gallery',
            subtitle: 'Glimpses of Yemen\'s beauty',
        },
        contact: {
            title: 'Contact Us',
            subtitle: 'We are here to answer your questions and plan your next trip.',
            form: {
                name: 'Full Name',
                email: 'Email Address',
                message: 'Your Message',
                submit: 'Send Message',
            },
            info: {
                address: 'Haddah Street, Sana\'a, Yemen',
                phone: '+7 999 984 6073',
                email: 'sadeqeissa@gmail.com',
                googleMaps: 'https://www.google.com/maps/search/?api=1&query=Haddah+Street,+Sana\'a,+Yemen',
            }
        },
        tips: {
            title: 'Traveler Tips',
            subtitle: 'Everything you need to know before your visit',
        },
        footer: {
            about: 'Yemen Gems',
            description: 'Your premier gateway to exploring the beauty, history, and civilization of Yemen.',
            quick_links: 'Quick Links',
            contact: 'Contact Us',
            copyright: '© 2025 Yemen Gems. All rights reserved.',
        },
    },
};

export const destinations = [
    {
        id: 5,
        name: { ar: 'ميناء المكلا', en: 'Al-Mukalla Harbor' },
        description: {
            ar: 'عروس البحر العربي، حيث يلتقي التاريخ بجمال الشاطئ.',
            en: 'The Bride of the Arabian Sea, where history meets coastal beauty.',
        },
        story: {
            ar: 'المكلا، عاصمة حضرموت الساحلية، تتميز بقنواتها المائية (الخور) ومبانيها البيضاء الناصعة. كانت ولا تزال مركزاً هاماً للتجارة وصيد الأسماك، وتشتهر بثقافتها البحرية الغنية.',
            en: 'Al-Mukalla, the coastal capital of Hadramout, is distinguished by its canals (Khor) and pristine white buildings. It has been and remains an important center for trade and fishing, famous for its rich maritime culture.',
        },
        image: '/images/almukalla_harbor_1764603566692.webp',
    },
    {
        id: 2,
        name: { ar: 'صنعاء القديمة', en: 'Old City of Sana\'a' },
        description: {
            ar: 'مدينة سام، أقدم المدن المأهولة في العالم بمعمارها الفريد.',
            en: 'The city of Sam, one of the oldest inhabited cities with unique architecture.',
        },
        story: {
            ar: 'صنعاء، إحدى أقدم المدن المأهولة باستمرار في العالم، يعود تاريخها إلى أكثر من 2500 عام. تتميز بمنازلها البرجية المزينة بالزخارف الهندسية البيضاء (القمريات). تقول الأسطورة أن سام بن نوح هو من أسسها بعد الطوفان.',
            en: 'Sana\'a, one of the oldest continuously inhabited cities in the world, dates back over 2,500 years. It is famous for its tower houses decorated with white geometric patterns (Qamariya). Legend has it that Shem, the son of Noah, founded it after the Great Flood.',
        },
        image: '/images/hero_background_1764603109548.webp',
    },
    {
        id: 3,
        name: { ar: 'شيبام حضرموت', en: 'Shibam Hadramout' },
        description: {
            ar: 'مانهاتن الصحراء، أول ناطحات سحاب طينية في العالم.',
            en: 'The Manhattan of the Desert, the world\'s first mud-brick skyscrapers.',
        },
        story: {
            ar: 'شيبام هي أعجوبة معمارية تعود للقرن السادس عشر. بُنيت ناطحات السحاب الطينية هذه لتوفير الحماية من الغارات البدوية والفيضانات. ترتفع بعض المباني لأكثر من 30 متراً وهي مصنوعة بالكامل من الطوب اللبن.',
            en: 'Shibam is a 16th-century architectural marvel. These mud-brick skyscrapers were built for protection against Bedouin raids and floods. Some buildings rise over 30 meters and are made entirely of mud brick.',
        },
        image: '/images/shibam_hadramout_1764603231216.webp',
    },
    {
        id: 4,
        name: { ar: 'ساحل عدن', en: 'Aden Coast' },
        description: {
            ar: 'شواطئ ذهبية ومياه فيروزية في قلب فوهة بركانية قديمة.',
            en: 'Golden beaches and turquoise waters in the heart of an ancient volcanic crater.',
        },
        story: {
            ar: 'عدن، الميناء التاريخي الاستراتيجي، تقع داخل فوهة بركان خامد. كانت مركزاً تجارياً رئيسياً منذ العصور القديمة، تربط الشرق بالغرب. قلعة صيرة التاريخية تقف شاهدة على قرون من الدفاع عن المدينة.',
            en: 'Aden, the strategic historic port, lies within a dormant volcanic crater. It has been a major trading hub since ancient times, connecting East and West. The historic Sira Fortress stands as a witness to centuries of defending the city.',
        },
        image: '/images/aden_coast_1764603413447.webp',
    },
    {
        id: 6,
        name: { ar: 'ميناء المخا', en: 'Port of Mocha' },
        description: {
            ar: 'مهد القهوة للعالم، مدينة تاريخية عريقة على البحر الأحمر.',
            en: 'The cradle of coffee to the world, an ancient historic city on the Red Sea.',
        },
        story: {
            ar: 'المخا هو الميناء الذي أعطى قهوة "الموكا" اسمها. في القرنين الخامس عشر والسابع عشر، كان السوق الرئيسي لتجارة البن في العالم. لا تزال آثار المنازل التجارية القديمة والمساجد تشهد على مجدها الغابر.',
            en: 'Mocha is the port that gave "Mocha" coffee its name. In the 15th and 17th centuries, it was the world\'s primary marketplace for coffee trade. Ruins of old merchant houses and mosques still testify to its past glory.',
        },
        image: '/images/mocha_coffee_port_1764603806013.webp',
    },
    {
        id: 1,
        name: { ar: 'جزيرة سقطرى', en: 'Socotra Island' },
        description: {
            ar: 'جوهرة المحيط الهندي، موطن شجرة دم الأخوين والطبيعة النادرة.',
            en: 'The jewel of the Indian Ocean, home to the Dragon Blood Tree and rare nature.',
        },
        story: {
            ar: 'تُعرف سقطرى بأنها "غالاباغوس المحيط الهندي". انفصلت عن البر الرئيسي لأفريقيا قبل ملايين السنين، مما أدى إلى تطور حياة نباتية وحيوانية فريدة لا توجد في أي مكان آخر على وجه الأرض. الأساطير القديمة تقول أن شجرة دم الأخوين نبتت من دماء الأخوين قابيل وهابيل.',
            en: 'Known as the "Galapagos of the Indian Ocean," Socotra separated from mainland Africa millions of years ago, evolving unique flora and fauna found nowhere else on Earth. Ancient legends say the Dragon Blood Tree sprouted from the blood of the brothers Cain and Abel.',
        },
        image: '/images/socotra_dragon_tree_1764603178352.webp',
    },
];

export const travelTips = [
    {
        id: 1,
        title: { ar: 'أفضل وقت للزيارة', en: 'Best Time to Visit' },
        content: {
            ar: 'من أكتوبر إلى أبريل حيث يكون الطقس معتدلاً ومناسباً للاستكشاف.',
            en: 'From October to April when the weather is mild and perfect for exploration.',
        },
        icon: 'Calendar',
    },
    {
        id: 2,
        title: { ar: 'العملة المحلية', en: 'Local Currency' },
        content: {
            ar: 'الريال اليمني هو العملة الرسمية. يفضل حمل النقد دائماً.',
            en: 'The Yemeni Rial is the official currency. It is always best to carry cash.',
        },
        icon: 'Banknote',
    },
    {
        id: 3,
        title: { ar: 'الملابس المناسبة', en: 'Dress Code' },
        content: {
            ar: 'ينصح بارتداء ملابس محتشمة ومريحة تناسب العادات المحلية.',
            en: 'Modest and comfortable clothing respecting local customs is recommended.',
        },
        icon: 'Shirt',
    },
    {
        id: 4,
        title: { ar: 'التنقل والمواصلات', en: 'Transportation' },
        content: {
            ar: 'استئجار سيارة مع سائق محلي هو الخيار الأفضل والأكثر أماناً.',
            en: 'Hiring a car with a local driver is the best and safest option.',
        },
        icon: 'Car',
    },
    {
        id: 5,
        title: { ar: 'الطعام والشراب', en: 'Food & Drink' },
        content: {
            ar: 'جرب المندي والسلتة. اشرب المياه المعبأة فقط.',
            en: 'Try Mandi and Saltah. Drink only bottled water.',
        },
        icon: 'Utensils',
    },
    {
        id: 6,
        title: { ar: 'التصوير', en: 'Photography' },
        content: {
            ar: 'استأذن دائماً قبل تصوير السكان المحليين، خاصة النساء.',
            en: 'Always ask for permission before photographing locals, especially women.',
        },
        icon: 'Camera',
    },
];

export const socialLinks = {
    whatsapp: 'https://wa.me/79999846073',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
};
