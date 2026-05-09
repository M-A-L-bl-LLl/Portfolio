export type Lang = 'en' | 'ru'

// Sep 2021 is the start of professional experience
const _expStart = new Date(2021, 8) // Sep 2021
export function expYears(): number {
  const now = new Date()
  return Math.floor(((now.getFullYear() - _expStart.getFullYear()) * 12 + (now.getMonth() - _expStart.getMonth())) / 12)
}

export const t = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hello, I'm",
      title: 'Unity Game Developer',
      description:
        `${expYears()}+ years building VR multiplayer arenas, mobile games, and WebGL projects.`,
      stack: 'Unity · C# · Netcode · Zenject · VR',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
    },
    about: {
      index: '01.',
      title: 'About Me',
      photoAlt: 'photo',
    },
    experience: {
      index: '02.',
      title: 'Experience',
    },
    skills: {
      index: '03.',
      title: 'Skills',
      groups: {
        core: 'Core',
        multiplayer: 'Multiplayer',
        architecture: 'Architecture',
        platforms: 'Platforms',
        backend: 'Backend & Data',
        tools: 'Tools',
      },
      typing: {
        hint: '// TYPE A SKILL NAME + ENTER TO MASTER IT',
        placeholder: 'unity, c#, firebase...',
        mastered: 'MASTERED',
        masteredConfirm: '✓ MASTERED',
        counter: (n: number, total: number) => `${n} / ${total} mastered`,
      },
    },
    projects: {
      index: '04.',
      title: 'Projects',
      soon: '// Projects coming soon',
    },
    contact: {
      index: '05.',
      title: 'Get In Touch',
      description: 'Open to new projects and collaborations. Drop me a message.',
    },
    footer: 'Unity Developer',
    projectDetail: {
      back: '← Back',
      playGoogle: '▶ Google Play',
      playAppStore: '▶ App Store',
      playVisit: '▶ Play / Visit',
      watchYoutube: '▶ Watch',
      notFound: 'Project not found.',
      backHome: '← Back to home',
    },
  },
  ru: {
    nav: {
      about: 'Обо мне',
      experience: 'Опыт',
      skills: 'Навыки',
      projects: 'Проекты',
      contact: 'Контакты',
    },
    hero: {
      greeting: 'Привет, я',
      title: 'Unity-разработчик',
      description:
        `${expYears()}+ года разработки VR-арен, мобильных игр и WebGL-проектов.`,
      stack: 'Unity · C# · Netcode · Zenject · VR',
      viewProjects: 'Мои проекты',
      contactMe: 'Написать мне',
    },
    about: {
      index: '01.',
      title: 'Обо мне',
      photoAlt: 'фото',
    },
    experience: {
      index: '02.',
      title: 'Опыт работы',
    },
    skills: {
      index: '03.',
      title: 'Навыки',
      groups: {
        core: 'Основное',
        multiplayer: 'Мультиплеер',
        architecture: 'Архитектура',
        platforms: 'Платформы',
        backend: 'Бэкенд и данные',
        tools: 'Инструменты',
      },
      typing: {
        hint: '// ВВЕДИ НАЗВАНИЕ НАВЫКА + ENTER ЧТОБЫ ОСВОИТЬ ЕГО',
        placeholder: 'unity, c#, firebase...',
        mastered: 'ОСВОЕНО',
        masteredConfirm: '✓ ОСВОЕНО',
        counter: (n: number, total: number) => `${n} / ${total} освоено`,
      },
    },
    projects: {
      index: '04.',
      title: 'Проекты',
      soon: '// Проекты скоро появятся',
    },
    contact: {
      index: '05.',
      title: 'Связаться',
      description: 'Открыт для новых проектов и сотрудничества. Напишите мне.',
    },
    footer: 'Unity-разработчик',
    projectDetail: {
      back: '← Назад',
      playGoogle: '▶ Google Play',
      playAppStore: '▶ App Store',
      playVisit: '▶ Играть / Открыть',
      watchYoutube: '▶ Смотреть',
      notFound: 'Проект не найден.',
      backHome: '← На главную',
    },
  },
}

// startMonth/endMonth: 1-based. endYear/endMonth omitted = current date.
function calcDuration(lang: 'en' | 'ru', startYear: number, startMonth: number, endYear?: number, endMonth?: number): string {
  const end = endYear !== undefined && endMonth !== undefined ? new Date(endYear, endMonth - 1) : new Date()
  const start = new Date(startYear, startMonth - 1)
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  const years = Math.floor(months / 12)
  const rem = months % 12
  if (lang === 'en') {
    if (years === 0) return `${rem} mo`
    if (rem === 0) return `${years} yr`
    return `${years} yr ${rem} mo`
  } else {
    if (years === 0) return `${rem} мес`
    if (rem === 0) return `${years} г`
    return `${years} г ${rem} мес`
  }
}

export const experienceData = {
  en: [
    {
      company: 'Freelance',
      role: 'Unity Developer',
      period: 'Oct 2022 — Present',
      duration: calcDuration('en', 2022, 10),
      description:
        'Developed and shipped mobile and WebGL games independently. Published titles on Google Play, App Store and WebGL platforms.',
      stack: ['Unity', 'C#', 'Addressables', 'Zenject', 'UniRx', 'GamePush', 'Firebase', 'Photon'],
    },
    {
      company: 'VrReal',
      role: 'Unity Developer',
      period: 'Sep 2023 — Dec 2025',
      duration: calcDuration('en', 2023, 9, 2025, 12),
      description:
        'Built commercial multiplayer VR arenas for up to 10 players on local network. Handled real-time sync, VR device optimization, and gameplay mechanics.',
      stack: ['Unity', 'C#', 'Unity Netcode', 'VR (OpenXR)', 'Hurricane VR', 'Zenject', 'UniRx', 'PlasticSCM'],
      link: 'https://vr-real.ru/',
    },
    {
      company: 'Технопарк РГСУ',
      role: 'Unity Developer',
      period: 'Jun 2022 — Oct 2022',
      duration: calcDuration('en', 2022, 6, 2022, 10),
      description:
        'Developed a networked VR military training simulator — first-person shooter supporting up to 10 players on a local network.',
      stack: ['Unity', 'C#', 'VR', 'OpenXR', 'Unity Netcode', 'MySQL'],
    },
    {
      company: 'Технопарк РГСУ',
      role: 'Intern',
      period: 'Sep 2021 — May 2022',
      duration: calcDuration('en', 2021, 9, 2022, 5),
      description:
        'Built a VR trainer for social workers, a virtual modern art exhibition, and a 360° mobile app for the Armed Forces temple.',
      stack: ['Unity', 'C#', 'VR', 'OpenXR', 'UniRx'],
    },
  ],
  ru: [
    {
      company: 'Фриланс',
      role: 'Unity-разработчик',
      period: 'Окт 2022 — настоящее время',
      duration: calcDuration('ru', 2022, 10),
      description:
        'Разработка и выпуск мобильных и WebGL-игр. Опубликованные проекты на Google Play, App Store и WebGL-площадках.',
      stack: ['Unity', 'C#', 'Addressables', 'Zenject', 'UniRx', 'GamePush', 'Firebase', 'Photon'],
    },
    {
      company: 'VrReal',
      role: 'Unity-разработчик',
      period: 'Сен 2023 — Дек 2025',
      duration: calcDuration('ru', 2023, 9, 2025, 12),
      description:
        'Разработка коммерческих мультиплеерных VR-арен для до 10 игроков по локальной сети. Синхронизация в реальном времени, оптимизация под VR-устройства, реализация игровых механик.',
      stack: ['Unity', 'C#', 'Unity Netcode', 'VR (OpenXR)', 'Hurricane VR', 'Zenject', 'UniRx', 'PlasticSCM'],
      link: 'https://vr-real.ru/',
    },
    {
      company: 'Технопарк РГСУ',
      role: 'Unity-разработчик',
      period: 'Июн 2022 — Окт 2022',
      duration: calcDuration('ru', 2022, 6, 2022, 10),
      description:
        'Разработка сетевого VR-тренажёра для военной промышленности — шутер от первого лица на до 10 игроков по локальной сети.',
      stack: ['Unity', 'C#', 'VR', 'OpenXR', 'Unity Netcode', 'MySQL'],
    },
    {
      company: 'Технопарк РГСУ',
      role: 'Стажёр',
      period: 'Сен 2021 — Май 2022',
      duration: calcDuration('ru', 2021, 9, 2022, 5),
      description:
        'Разработка VR-тренажёра для социальных работников, виртуальной выставки современного искусства и мобильного приложения с 360°-экскурсией по храму Вооружённых Сил.',
      stack: ['Unity', 'C#', 'VR', 'OpenXR', 'UniRx'],
    },
  ],
}

export const projectsData = {
  en: {
    'vr-fantasy-adventure': {
      title: 'VR Fantasy Adventure',
      description:
        'Multiplayer VR fantasy adventure for commercial VR arenas. Supports up to 10 players on a local network with real-time synchronization of all player interactions. Built for VrReal — a commercial VR arena company.',
      shortDescription: 'Multiplayer VR fantasy adventure for commercial arenas. Up to 10 players, local network.',
    },
    'vr-shooter-coop': {
      title: 'Cooperative VR Shooter',
      description:
        'Co-op VR shooter for commercial VR arenas, developed at VrReal. Real-time multiplayer up to 10 players on a local network. Optimized for VR devices with stable performance under high load.',
      shortDescription: 'Co-op VR shooter for commercial arenas. Real-time multiplayer, up to 10 players.',
    },
    'fighting-game': {
      title: 'IBA Boxing',
      description:
        'Dynamic mobile multiplayer fighting game created by a development team with the support of the International Boxing Association. Allows players to compete against opponents from around the world in real time. Published on Google Play and App Store.',
      shortDescription: 'Mobile multiplayer fighting game backed by the International Boxing Association.',
    },
    'idle-boxing': {
      title: 'Idle Boxing',
      description:
        'Idle game about boxing published on Yandex Games. Progression-focused gameplay with idle mechanics, integrations with GamePush for leaderboards and achievements.',
      shortDescription: 'Idle boxing game on Yandex Games. Progression & leaderboards.',
    },
    'traffic-puzzle': {
      title: 'Traffic Puzzle',
      description:
        'Puzzle game "Unblock the traffic" published on Yandex Games. Logic-based WebGL game with level progression, built for web with Yandex Games SDK integration.',
      shortDescription: 'WebGL traffic unblock puzzle on Yandex Games.',
    },
    'no-more-pain-editor': {
      title: 'No More Pain Editor',
      description:
        'Unity Editor productivity toolkit with hierarchy navigation, project folder styling, favorites overlay, mesh hover previews, inspector tabs, component copy/paste, and play mode value saving.',
      shortDescription: 'Unity Editor productivity toolkit for faster hierarchy, project, and inspector workflows.',
    },
    'mesh2png': {
      title: 'Mesh2PNG',
      description:
        'Unity Editor tool for rendering 3D objects, prefabs, and hierarchy parts into transparent PNG sprites or icons without entering Play Mode. Includes live preview, camera controls, lighting setup, and batch capture.',
      shortDescription: 'Unity Editor tool for rendering 3D objects into transparent PNG sprites and icons.',
    },
    'vr-base-defense': {
      title: 'Cooperative VR Base Defense',
      description:
        'Cooperative VR shooter with base defense mechanics for commercial VR arenas, developed at VrReal. Players defend their base from waves of enemies in real-time multiplayer on a local network.',
      shortDescription: 'Co-op VR base defense shooter for commercial arenas.',
    },
    'vr-kids-games': {
      title: 'VR Kids Games',
      description:
        'Collection of VR mini-games designed for children, developed at VrReal. Safe and engaging interactive experiences optimized for younger audiences in commercial VR arenas.',
      shortDescription: 'VR mini-games for children in commercial arenas.',
    },
    'vr-military-trainer': {
      title: 'VR Military Training Simulator',
      description:
        'Networked VR training simulator for the military industry. First-person shooter supporting up to 10 players on a local network. Developed at Технопарк РГСУ.',
      shortDescription: 'Networked VR military training shooter. Up to 10 players, local multiplayer.',
    },
    'vr-social-trainer': {
      title: 'VR Social Worker Trainer',
      description:
        'VR training simulator for social workers, developed at Технопарк РГСУ internship. Interactive scenario-based training in a virtual environment.',
      shortDescription: 'VR training simulator for social workers.',
    },
    'vr-art-exhibition': {
      title: 'VR Modern Art Exhibition',
      description:
        'Virtual reality exhibition of modern art, developed during internship at Технопарк РГСУ. Immersive gallery experience in VR.',
      shortDescription: 'Immersive VR gallery of modern art.',
    },
  },
  ru: {
    'vr-fantasy-adventure': {
      title: 'VR Фэнтези-приключение',
      description:
        'Мультиплеерное VR-приключение в жанре фэнтези для коммерческих VR-арен. Поддержка до 10 игроков по локальной сети с синхронизацией взаимодействий в реальном времени. Разработано для VrReal.',
      shortDescription: 'Мультиплеерное VR-приключение для коммерческих арен. До 10 игроков.',
    },
    'vr-shooter-coop': {
      title: 'Кооперативный VR-шутер',
      description:
        'Кооперативный VR-шутер для коммерческих VR-арен, разработанный в VrReal. Мультиплеер в реальном времени до 10 игроков по локальной сети. Оптимизирован под VR-устройства со стабильной работой под нагрузкой.',
      shortDescription: 'Кооперативный VR-шутер для арен. Real-time мультиплеер, до 10 игроков.',
    },
    'fighting-game': {
      title: 'IBA Boxing',
      description:
        'Динамичная мобильная мультиплеерная игра в жанре файтинг, созданная командой разработчиков при поддержке International Boxing Association. Позволяет сразиться с игроками со всего мира в режиме реального времени. Опубликована на Google Play и App Store.',
      shortDescription: 'Мобильный мультиплеерный файтинг при поддержке International Boxing Association.',
    },
    'idle-boxing': {
      title: 'Idle-игра про бокс',
      description:
        'Idle-игра про бокс, опубликованная на Яндекс Играх. Геймплей с прогрессией и idle-механиками, интеграция с GamePush для таблиц лидеров и достижений.',
      shortDescription: 'Idle-игра про бокс на Яндекс Играх. Прогрессия и лидерборды.',
    },
    'traffic-puzzle': {
      title: 'Разбери пробку',
      description:
        'Головоломка «Разбери пробку», опубликованная на Яндекс Играх. Логическая WebGL-игра с прогрессией уровней и интеграцией Yandex Games SDK.',
      shortDescription: 'WebGL-головоломка про пробки на Яндекс Играх.',
    },
    'no-more-pain-editor': {
      title: 'No More Pain Editor',
      description:
        'Набор инструментов для повышения продуктивности в Unity Editor: навигация по Hierarchy, стили папок в Project, панель избранного, hover preview для мешей, вкладки Inspector, копирование компонентов и сохранение значений в Play Mode.',
      shortDescription: 'Набор Unity Editor-инструментов для ускорения работы с Hierarchy, Project и Inspector.',
    },
    'mesh2png': {
      title: 'Mesh2PNG',
      description:
        'Инструмент для Unity Editor, который рендерит 3D-объекты, префабы и части иерархии в прозрачные PNG-спрайты или иконки без запуска Play Mode. Есть live preview, настройки камеры, освещение и пакетный экспорт.',
      shortDescription: 'Unity Editor-инструмент для рендера 3D-объектов в прозрачные PNG-спрайты и иконки.',
    },
    'vr-base-defense': {
      title: 'Кооперативный VR-шутер с защитой базы',
      description:
        'Кооперативный VR-шутер с механикой защиты базы для коммерческих VR-арен, разработанный в VrReal. Игроки защищают базу от волн врагов в мультиплеере реального времени по локальной сети.',
      shortDescription: 'Кооперативный VR-шутер с защитой базы для коммерческих арен.',
    },
    'vr-kids-games': {
      title: 'Детские VR-игры',
      description:
        'Набор VR-мини-игр для детей, разработанный в VrReal. Безопасные и увлекательные интерактивные развлечения, оптимизированные для юной аудитории в коммерческих VR-аренах.',
      shortDescription: 'VR-мини-игры для детей в коммерческих аренах.',
    },
    'vr-military-trainer': {
      title: 'VR Военный тренажёр',
      description:
        'Сетевой VR-тренажёр для военной промышленности. Шутер от первого лица на до 10 игроков по локальной сети. Разработан в Технопарке РГСУ.',
      shortDescription: 'Сетевой VR-тренажёр для военной подготовки. До 10 игроков.',
    },
    'vr-social-trainer': {
      title: 'VR-тренажёр для соцработников',
      description:
        'VR-тренажёр для социальных работников, разработанный во время стажировки в Технопарке РГСУ. Интерактивное сценарное обучение в виртуальной среде.',
      shortDescription: 'VR-тренажёр для обучения социальных работников.',
    },
    'vr-art-exhibition': {
      title: 'VR Выставка современного искусства',
      description:
        'Виртуальная выставка современного искусства, разработанная во время стажировки в Технопарке РГСУ. Иммерсивный галерейный опыт в VR.',
      shortDescription: 'Иммерсивная VR-галерея современного искусства.',
    },
  },
}
