export const CONTENT = {
  bg: {
    hero: {
      eyebrow: "Клуб по спортни танци · София",
      title: "Клуб по спортни танци",
      brand: "IMPULS – SOFIA",
      subtitle:
        "Заедно танцуваме, учим, растем и постигаме успехи – станете част от нашето семейство.",
      btnPrimary: "Разгледай групите ни",
      btnSecondary: "Галерия",
      newLabel: "Безплатен първи урок – запиши се днес.",
    },
    features: {
      title: "Защо да изберете нас",
      list: [
        {
          title: "Експертни треньори",
          desc: "Нашият екип от опитни треньори работи с отдаденост и професионализъм, за да вдъхновява децата и да развива техните умения, увереност и любов към спортните танци.",
          icon: "🎓",
        },
        {
          title: "Гъвкав график",
          desc: "Предлагаме групови тренировки за всички нива на подготовка, както и индивидуални уроци, съобразени с нуждите и целите на всеки танцьор.",
          icon: "⏰",
        },
        {
          title: "Състезания и концертни изяви",
          desc: "Клубът участва в национални и международни състезания и организира концерти и сценични изяви за всички свои танцьори.",
          icon: "🎭",
        },
      ],
    },
    dances: [
      {
        label: "Латиноамерикански танци",
        list: ["Самба", "Ча-ча-ча", "Румба", "Пасо добле", "Джайв"],
      },
      {
        label: "Стандартни танци",
        list: ["Английски валс", "Танго", "Виенски валс", "Фокстрот", "Куикстеп"],
      },
    ],
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
      imageTag: "Нови групи от 5-ти октомври",
      imageSub: "Записването е отворено",
      titleStart: "Открийте магията на",
      titleHighlight: "спортните танци!",
      desc: "Запишете детето си в Клуб по спортни танци „Импулс – София“ и му подарете възможност да развие талант, увереност и любов към танца в приятелска и вдъхновяваща среда.",
      stats: [
        { value: "150+", label: "Активни ученици" },
        { value: "30+", label: "Години опит" },
        { value: "8+", label: "Седмични групи" },
        { value: "100%", label: "Положителни емоции" },
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
      menu: "Меню",
      subtitle: "Движение • Страст • Общност",
    },
    footer: {
      col1: "За нас",
      col1_links: {
        story: "Нашата история",
        classes: "Групи",
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
      title: "Направете първата стъпка към света на танца",
      desc: "Първият урок е безплатен, а ние ви очакваме с усмивка, за да учим, танцуваме и се забавляваме заедно в Клуб по спортни танци „Импулс – София“.",
      btn: "Запази безплатен урок",
    },
    classesPage: {
      title: "Нашите групи",
      subtitle: "Изберете своята танцова група.",
      labels: {
        schedule: "График:",
        btn: "Запиши се",
      },
      list: [
        {
          title: "Начинаещи",
          desc: "Начинаещата група има за цел да развие чувство за ритъм, музикалност и координация, като запознае децата с основите на латиноамериканските и стандартните спортни танци.",
          schedule: ["Понеделник и Четвъртък: 18:00 - 19:00"],
        },
        {
          title: "Напреднали",
          desc: "Напредналата група има за цел да усъвършенства техниката на танцьорите и да развие уменията им чрез изучаване на по-сложни фигури и комбинации в латиноамериканските и стандартните спортни танци.",
          schedule: ["Понеделник: 19:00 - 20:00", "Сряда: 18:00 - 19:00"],
        },
        {
          title: "Състезатели",
          desc: "Групата е насочена към професионално спортно развитие, усъвършенстване на техниката на високо ниво и целенасочена подготовка за участие в национални и международни турнири по спортни танци.",
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
      viewAlbum: "Разгледай албума",
      empty: "Все още няма албуми.",
      noImages: "Няма снимки в този албум.",
      close: "Затвори",
      prev: "Предишна снимка",
      next: "Следваща снимка",
    },
    contactPage: {
      title: "Свържете се с нас",
      desc: "Имате въпроси за графика, групите или участия? Изпратете ни съобщение.",
      form: {
        namePh: "Вашето Име",
        emailPh: "Вашият Email",
        phonePh: "Вашият Телефон",
        msgPh: "Вашето Съобщение...",
        labels: {
          name: "Име",
          email: "Имейл",
          phone: "Телефон",
          message: "Съобщение",
        },
        btn: "Изпрати",
        sending: "Изпращане...",
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
        emailLabel: "Имейл:",
        mapTitle: "Карта с местоположението на Импулс София",
      },
    },
    newsPage: {
      title: "Новини",
      subtitle:
        "Бъдете в крак с последните събития и участия от нашия клуб.",
      loading: "Зареждане на новини...",
      empty: "Все още няма публикувани новини.",
      readMore: "Прочети статията",
      back: "Назад към новини",
      notFound: "Статията не е намерена.",
    },
    notFoundPage: {
      title: "Страницата не е намерена",
      desc: "Изглежда тази страница е излязла от залата.",
      btn: "Обратно начало",
    },
  },
  en: {
    hero: {
      eyebrow: "Dancesport club · Sofia",
      title: "Dancesport club",
      brand: "IMPULS – SOFIA",
      subtitle:
        "Together we dance, learn, grow and succeed – become part of our family.",
      btnPrimary: "Explore classes",
      btnSecondary: "View gallery",
      newLabel: "Free first class – sign up today.",
    },
    contactPage: {
      title: "Get in touch",
      desc: "Questions about classes, schedule, or booking performances? Send us a message.",
      form: {
        namePh: "Your Name",
        emailPh: "Your Email",
        phonePh: "Your Phone Number",
        msgPh: "Your Message...",
        labels: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          message: "Message",
        },
        btn: "Send Message",
        sending: "Sending...",
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
        emailLabel: "Email:",
        mapTitle: "Map showing the location of Impuls Sofia",
      },
    },
    features: {
      title: "Why choose us",
      list: [
        {
          title: "Expert coaches",
          desc: "Our team of experienced coaches works with dedication and professionalism to inspire children and develop their skills, confidence and love for dancesport.",
          icon: "🎓",
        },
        {
          title: "Flexible schedule",
          desc: "We offer group training for every level, as well as private lessons tailored to the needs and goals of each dancer.",
          icon: "⏰",
        },
        {
          title: "Competitions and concerts",
          desc: "The club takes part in national and international competitions and organises concerts and stage performances for all its dancers.",
          icon: "🎭",
        },
      ],
    },
    dances: [
      {
        label: "Latin American",
        list: ["Samba", "Cha-cha-cha", "Rumba", "Paso Doble", "Jive"],
      },
      {
        label: "Standard",
        list: ["Waltz", "Tango", "Viennese Waltz", "Foxtrot", "Quickstep"],
      },
    ],
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
      menu: "Menu",
      subtitle: "Movement • Passion • Community",
    },
    galleryPage: {
      title: "Gallery",
      desc: "Selected highlights from classes, showcases, and rehearsals.",
      loading: "Loading images...",
      defaultAlt: "Gallery Image",
      viewAlbum: "View album",
      empty: "No albums yet.",
      noImages: "No images in this album yet.",
      close: "Close",
      prev: "Previous photo",
      next: "Next photo",
    },
    classesPage: {
      title: "Classes",
      subtitle: "Choose your dance group.",
      labels: {
        schedule: "Schedule:",
        btn: "Join",
      },
      list: [
        {
          title: "Beginners",
          desc: "The beginners group develops a sense of rhythm, musicality and coordination, introducing children to the basics of Latin American and Standard dancesport.",
          schedule: ["Monday & Thursday: 18:00 - 19:00"],
        },
        {
          title: "Advanced",
          desc: "The advanced group refines the dancers' technique and builds their skills through more complex figures and combinations in Latin American and Standard dancesport.",
          schedule: ["Monday: 19:00 - 20:00", "Wednesday: 18:00 - 19:00"],
        },
        {
          title: "Competitive",
          desc: "This group is focused on professional sporting development, high-level technique and targeted preparation for national and international dancesport tournaments.",
          schedule: [
            "Wednesday: 19:00 - 20:30",
            "Friday: 18:00 - 21:00",
            "Sunday: 14:30 - 16:00",
          ],
        },
      ],
    },
    footer: {
      col1: "About",
      col1_links: {
        story: "Our Story",
        classes: "Classes",
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
      imageTag: "New groups from 5 October",
      imageSub: "Enrollment Open Now",
      titleStart: "Discover the magic of",
      titleHighlight: "dancesport!",
      desc: "Enrol your child at Dancesport Club “Impuls – Sofia” and give them the chance to develop talent, confidence and a love of dance in a friendly, inspiring environment.",
      stats: [
        { value: "150+", label: "Active Students" },
        { value: "30+", label: "Years Experience" },
        { value: "8+", label: "Weekly Classes" },
        { value: "100%", label: "Positive Emotions" },
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
      title: "Take the first step into the world of dance",
      desc: "The first class is free, and we'll be waiting with a smile to learn, dance and have fun together at Dancesport Club “Impuls – Sofia”.",
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
      back: "Back to news",
      notFound: "Article not found.",
    },
    notFoundPage: {
      title: "Page not found",
      desc: "Looks like this page stepped off the stage.",
      btn: "Back to home",
    },
  },
};
