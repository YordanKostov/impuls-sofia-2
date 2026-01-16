// src/textData.js

export const CONTENT = {
  bg: {
    hero: {
      title: "Открий своя ритъм. Владей сцената.",
      subtitle:
        "Присъединете се към нашата общност от танцьори — групи за всички възрасти и нива. От техника за начинаещи до хореография за напреднали.",
      btnPrimary: "Разгледай групите ни",
      btnSecondary: "Галерия",
      newLabel: "Ново: Безплатен пробен урок за начинаещи — запиши се днес.",
    },
    features: {
      title: "Защо да изберете нас",
      list: [
        {
          title: "Експертни инструктори",
          desc: "Професионални танцьори с опит в преподаването на различни стилове.",
          icon: "🎓",
        },
        {
          title: "Гъвкав график",
          desc: "Сутрешни, вечерни и съботно-неделни групи за заети семейства.",
          icon: "⏰",
        },
        {
          title: "Изяви и спектакли",
          desc: "Годишни концерти, състезания и събития през цялата година.",
          icon: "🎭",
        },
      ],
    },
    gallery: {
      title: "Галерия",
      seeAll: "Виж всички",
      loading: "Зареждане на галерията...",
    },
    about: {
      title: "История и Философия",
      desc: `Клуб по спортни танци „Импулс – София“ е създаден с много любов, вдъхновение и стремеж към професионален растеж. Основан през 2017 г., клубът се развива динамично и с всяка изминала година танцовото ни семейство се разраства с нови членове.

Нашите състезатели постигат все по-високи резултати, а за изминалите 9 години клубът може да се похвали с множество републикански шампионски и вицешампионски титли във всички възрастови категории – деца, юноши, младежи, състезатели до 19 и до 21 години, в латиноамерикански и стандартни танци, както и в многобой.

През последните години успехите ни се утвърждават и на международната сцена. Наши възпитаници станаха двукратни вицешампиони в стандартни танци и многобой в категория до 21 години, а клубът има и множество финалисти и полуфиналисти на световни първенства.

Днес „Импулс – София“ се гордее с над 50 активни състезатели, носители на престижни отличия от национални и международни турнири.

Зад успехите на всички танцови двойки и соло дами стоят безброй часове труд, упоритост, желание, страст, любов към танца и пълна отдаденост.
`,

      teamTitle: "Нашият Екип",
      instructors: [
        {
          name: "Иван Райков",
          role: "Главен Треньор",
          photo:
            "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1000&auto=format&fit=crop",
          bio: "Двигателят на нашия състезателен отбор. Иван се фокусира изцяло върху развитието на състезателни двойки за национални и международни подиуми, изграждайки техника, дисциплина и шампионски манталитет.",
        },
        {
          name: "Николета Райкова",
          role: "Главен Треньор",
          photo:
            "https://images.unsplash.com/photo-1546213290-e1b492ab3eee?q=80&w=1000&auto=format&fit=crop",
          bio: "Николета работи върху стила и хореографията на напредналите двойки. С безкомпромисно око за детайла, тя превръща добрата техника във вълнуващо изкуство и помага на състезателите да открият своя уникален почерк.",
        },
        {
          name: "Петя Костова",
          role: "Треньор",
          photo:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
          bio: "Специалист в работата с най-малките и начинаещите. Нейната суперсила е търпението и умението да обясни и най-сложните движения по достъпен и забавен начин, палейки искрата към танца.",
        },
      ],
    },
    splitSection: {
      imageTag: "Пролетен семестър",
      imageSub: "Записването е отворено",
      titleStart: "Общност, която",
      titleHighlight: "се движи заедно.",
      desc: "Независимо дали тренирате за професионална кариера на сцената или просто търсите забавен начин да сте активни, вашето място е тук.",
      stats: [
        { value: "250+", label: "Активни ученици", color: "text-purple-600" },
        { value: "12", label: "Години опит", color: "text-pink-600" },
        { value: "20+", label: "Седмични групи", color: "text-blue-600" },
        { value: "100%", label: "Страст", color: "text-orange-500" },
      ],
    },
    navbar: {
      links: [
        { to: "/", label: "Начало" },
        { to: "/about", label: "За нас" },
        { to: "/classes", label: "Групи" },
        { to: "/gallery", label: "Галерия" },
        { to: "/news", label: "Новини" },
        { to: "/contact", label: "Контакти" },
      ],
      bookBtn: "Запази час",
      subtitle: "Движение • Страст • Общност",
    },
    footer: {
      desc: "Повече от танцово студио. Ние сме общност, посветена на движението, страстта и артистичното развитие.",
      col1: "Студио",
      col1_links: {
        story: "Нашата история",
        classes: "Групи и Цени",
        gallery: "Галерия",
        news: "Последни новини",
      },
      col2: "Помощ",
      col2_links: {
        contact: "Свържете се с нас",
        privacy: "Поверителност",
        terms: "Условия за ползване",
      },
      col3: "Посетете ни",
      address: 'ж.к. Младост 2, ул. "Св. Киприян" 236, 1799, София',
      rights: "Всички права запазени.",
      madeWith: "Направено с ❤️ за танцьори.",
    },
    testimonials: {
      title: "Отзиви от залата",
      subtitle: "Истински истории от нашите ученици и родители.",
      list: [
        {
          name: "Сара Дженкинс",
          role: "Родител",
          quote:
            "Увереността, която дъщеря ми придоби тук, е безценна. Учителите са грижовни, но изключителни професионалисти.",
        },
        {
          name: "Майк Чен",
          role: "Хип-хоп за възрастни",
          quote:
            "Притеснявах се да започна да танцувам на 28, но атмосферата тук е толкова приветлива. Това е най-хубавата част от седмицата ми.",
        },
        {
          name: "Елена Родригес",
          role: "Балет",
          quote:
            "Професионално обучение в семейна среда. Годишният спектакъл беше абсолютно вълшебен.",
        },
      ],
    },
    cta: {
      title: "Готови ли сте да се раздвижите?",
      desc: "Първият урок е от нас. Запазете своя безплатен пробен час днес и вижте защо всички обичат нашият клуб.",
      btn: "Запази безплатен урок",
    },
    classesPage: {
      title: "Нашите групи",
      subtitle:
        "Ние предлагаме разнообразие от групи — от начинаещи до напреднали и състезатели. Открийте правилното ниво за вас.",
      labels: {
        schedule: "График:",
        btn: "Запиши се",
      },
      list: [
        {
          title: "Начинаещи",
          desc: "За деца от 5 до 13 години. Изграждаме правилна стойка, ритъм и координация. Тук създаваме първите приятелства в залата.",
          schedule: ["Понеделник и Четвъртък: 18:00 - 19:00"],
        },
        {
          title: "Напреднали",
          desc: "За тези, които искат повече. Учим сложни хореографии и работим върху самочувствието.",
          schedule: ["Понеделник: 19:00 - 20:00", "Сряда: 18:00 - 19:00"],
        },
        {
          title: "Състезатели",
          desc: "Пътят към медалите! Професионални тренировки, спортни лагери и участия в турнири.",
          schedule: [
            "Сряда: 19:00 - 20:30",
            "Петък: 18:00 - 21:00",
            "Неделя: 14:30 - 16:00",
          ],
        },
      ],
    },
    galleryPage: {
      title: "Галерия",
      desc: "Избрани моменти от тренировки, спектакли и репетиции.",
      loading: "Зареждане на изображения...",
      defaultAlt: "Снимка от галерията",
    },
    contactPage: {
      title: "Свържете се с нас",
      desc: "Имате въпроси за графика, групите или участия? Изпратете ни съобщение.",
      form: {
        namePh: "Вашето Име",
        emailPh: "Вашият Email",
        phonePh: "Вашият Телефон",
        msgPh: "Вашето Съобщение...",
        btn: "Изпрати",
        success: "✅ Съобщението е изпратено успешно!",
        error: "❌ Възникна грешка. Моля, опитайте отново.",
        validation: {
          name: "Моля, въведете име",
          email: "Моля, въведете валиден имейл",
          phone: "Моля, въведете валиден телефон (само цифри)",
          message: "Моля, напишете съобщение",
        },
      },
      info: {
        addressLabel: "Адрес:",
        addressVal: 'ж.к. Младост 2, ул. "Св. Киприян" 236, 1799, София',
        phoneLabel: "Телефон:",
      },
    },
    newsPage: {
      title: "Новини",
      subtitle:
        "Бъдете в крак с последните събития и участия от нашия клуб.",
      loading: "Зареждане на новини...",
      empty: "Все още няма публикувани новини.",
      readMore: "Прочети статията",
    },
  },
  en: {
    hero: {
      title: "Find your rhythm. Own the stage.",
      subtitle:
        "Join our welcoming community of dancers — classes for all ages and levels. From beginner technique to advanced choreography.",
      btnPrimary: "Explore classes",
      btnSecondary: "View gallery",
      newLabel: "New: Free trial class for first-timers — sign up today.",
    },
    contactPage: {
      title: "Get in touch",
      desc: "Questions about classes, schedule, or booking performances? Send us a message.",
      form: {
        namePh: "Your Name",
        emailPh: "Your Email",
        phonePh: "Your Phone Number",
        msgPh: "Your Message...",
        btn: "Send Message",
        success: "✅ Message sent successfully!",
        error: "❌ Something went wrong. Please try again.",
        validation: {
          name: "Name is required",
          email: "Valid email is required",
          phone: "Valid phone number is required (digits only)",
          message: "Message is required",
        },
      },
      info: {
        addressLabel: "Address:",
        addressVal: 'g.k. Mladost 2, ul. "Sv. Kipriyan" 236, 1799, Sofia',
        phoneLabel: "Phone:",
      },
    },
    features: {
      title: "Why choose us",
      list: [
        {
          title: "Expert instructors",
          desc: "Professional dancers with teaching experience across styles.",
          icon: "🎓",
        },
        {
          title: "Flexible schedule",
          desc: "Morning, evening and weekend classes for busy families.",
          icon: "⏰",
        },
        {
          title: "Performances",
          desc: "Showcases, competitions, and community events all year round.",
          icon: "🎭",
        },
      ],
    },
    gallery: {
      title: "Gallery",
      seeAll: "See all",
      loading: "Loading gallery preview...",
    },
    navbar: {
      links: [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/classes", label: "Classes" },
        { to: "/gallery", label: "Gallery" },
        { to: "/news", label: "News" },
        { to: "/contact", label: "Contact" },
      ],
      bookBtn: "Book a class",
      subtitle: "Movement • Passion • Community",
    },
    galleryPage: {
      title: "Gallery",
      desc: "Selected highlights from classes, showcases, and rehearsals.",
      loading: "Loading images...",
      defaultAlt: "Gallery Image",
    },
    classesPage: {
      title: "Classes",
      subtitle:
        "We offer a wide range of classes — from beginners to advanced and competitive levels. Find the perfect fit for you.",
      labels: {
        schedule: "Schedule:",
        btn: "Join",
      },
      list: [
        {
          title: "Beginners",
          desc: "For kids aged 5-13. Building posture, rhythm, and coordination. Where the first dance friendships are made.",
          schedule: ["Monday & Thursday: 18:00 - 19:00"],
        },
        {
          title: "Advanced",
          desc: "For those who want more. We learn complex choreographies and work on confidence.",
          schedule: ["Monday: 19:00 - 20:00", "Wednesday: 18:00 - 19:00"],
        },
        {
          title: "Competitive",
          desc: "The road to medals! Professional training, sports camps, and tournaments.",
          schedule: [
            "Wednesday: 19:00 - 20:30",
            "Friday: 18:00 - 21:00",
            "Sunday: 14:30 - 16:00",
          ],
        },
      ],
    },
    footer: {
      desc: "More than just a dance club. We are a community dedicated to movement, passion, and artistic growth.",
      col1: "Studio",
      col1_links: {
        story: "Our Story",
        classes: "Classes & Pricing",
        gallery: "Gallery",
        news: "Latest News",
      },
      col2: "Support",
      col2_links: {
        contact: "Contact Us",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
      col3: "Visit Us",
      address: 'g.k. Mladost 2, ul. "Sv. Kipriyan" 236, 1799, Sofia',
      rights: "All rights reserved.",
      madeWith: "Made with ❤️ for dancers.",
    },
    splitSection: {
      imageTag: "Spring Term",
      imageSub: "Enrollment Open Now",
      titleStart: "A community that",
      titleHighlight: "moves together.",
      desc: "Whether you're training for a career on stage or just looking for a fun way to stay active, you belong here.",
      stats: [
        { value: "250+", label: "Active Students", color: "text-purple-600" },
        { value: "12", label: "Years Experience", color: "text-pink-600" },
        { value: "20+", label: "Weekly Classes", color: "text-blue-600" },
        { value: "100%", label: "Passion", color: "text-orange-500" },
      ],
    },
    testimonials: {
      title: "Heard on the dance floor",
      subtitle: "Real stories from our students and parents.",
      list: [
        {
          name: "Sarah Jenkins",
          role: "Parent",
          quote:
            "The confidence my daughter has gained here is priceless. The teachers are nurturing but professional.",
        },
        {
          name: "Mike Chen",
          role: "Adult Hip-Hop",
          quote:
            "I was nervous to start dancing at 28, but the vibe here is so welcoming. It’s the highlight of my week.",
        },
        {
          name: "Elena Rodriguez",
          role: "Ballet Student",
          quote:
            "Professional training in a family environment. The end-of-year showcase was absolutely magical.",
        },
      ],
    },
    cta: {
      title: "Ready to start moving?",
      desc: "Your first class is on us. Book your free trial today and come see why everyone loves our club.",
      btn: "Book Free Trial",
    },
    about: {
      title: "History & Philosophy",
      desc: `Sports Dance Club "Impuls – Sofia" was created with much love, inspiration, and aspiration towards professional growth. Founded in 2017, the club develops dynamically, and with every passing year, our dance family expands with new members.

Our competitors achieve ever-higher results, and for the past 9 years, the club can boast of a multitude of national champion and vice-champion titles in all age categories – children, juniors, youths, competitors under 19 and under 21 years, in Latin American and Standard dances, as well as in all-around.

During the last years, our successes are establishing themselves on the international scene as well. Our trainees became two-time vice-champions in standard dances and all-around in the under-21 category, and the club also has a multitude of finalists and semi-finalists at world championships.

Today "Impuls – Sofia" prides itself on over 50 active competitors, bearers of prestigious distinctions from national and international tournaments.

Behind the successes of all dance couples and solo ladies stand countless hours of labor, persistence, desire, passion, love for the dance, and full dedication.`,
      teamTitle: "Our Team",
      instructors: [
        {
          name: "Ivan Raikov",
          role: "Head Coach",
          photo:
            "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1000&auto=format&fit=crop",
          bio: "The driving force behind our competitive team. Ivan focuses entirely on developing couples for national and international stages, building the technique, discipline, and mindset required for champions.",
        },
        {
          name: "Nikoleta Raikova",
          role: "Head Coach",
          photo:
            "https://images.unsplash.com/photo-1546213290-e1b492ab3eee?q=80&w=1000&auto=format&fit=crop",
          bio: "Nikoleta shapes the style and choreography of our advanced couples. With an uncompromising eye for detail, she transforms technical skill into captivating art, helping competitors find their unique signature.",
        },
        {
          name: "Petya Kostova",
          role: "Coach",
          photo:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
          bio: "Our specialist for kids and beginners. Her superpower is patience and the ability to explain even the most complex moves in a simple, fun way, sparking the love for dance in our newest members.",
        },
      ],
    },
    newsPage: {
      title: "News",
      subtitle:
        "Keep up with the latest events and performances from our club.",
      loading: "Loading news...",
      empty: "No news published yet.",
      readMore: "Read article",
    },
  },
};
