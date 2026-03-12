export interface Project {
  slug: string
  title: string
  description: string
  shortDescription: string
  coverImage?: string
  tags: string[]
  links?: {
    play?: string
    appstore?: string
    itch?: string
    github?: string
    youtube?: string
    website?: string
  }
  descriptionLinks?: Record<string, string>
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'vr-fantasy-adventure',
    title: 'VR Fantasy Adventure',
    description:
      'Multiplayer VR fantasy adventure for commercial VR arenas. Supports up to 10 players on a local network with real-time synchronization of all player interactions. Built for VrReal — a commercial VR arena company.',
    shortDescription: 'Multiplayer VR fantasy adventure for commercial arenas. Up to 10 players, local network.',
    tags: ['Unity', 'C#', 'VR', 'OpenXR', 'Unity Netcode', 'Multiplayer', 'Zenject'],
    links: { youtube: 'https://www.youtube.com/watch?v=wU4TWb01Dzg', website: 'https://vr-real.ru/' },
    featured: true,
  },
  {
    slug: 'vr-shooter-coop',
    title: 'Cooperative VR Shooter',
    description:
      'Co-op VR shooter for commercial VR arenas, developed at VrReal. Real-time multiplayer up to 10 players on a local network. Optimized for VR devices with stable performance under high load.',
    shortDescription: 'Co-op VR shooter for commercial arenas. Real-time multiplayer, up to 10 players.',
    tags: ['Unity', 'C#', 'VR', 'Hurricane VR', 'Unity Netcode', 'Multiplayer', 'Shader Graph'],
    links: { youtube: 'https://www.youtube.com/watch?v=u0AtYcGP4Ss', website: 'https://vr-real.ru/' },
    featured: true,
  },
  {
    slug: 'fighting-game',
    title: 'Fighting Game',
    description:
      'Mobile fighting game published on Google Play. Developed solo as part of freelance practice, covering game architecture, UI, combat mechanics, and mobile optimization.',
    shortDescription: 'Mobile fighting game on Google Play. Solo project.',
    tags: ['Unity', 'C#', 'Mobile', 'Android', 'iOS', 'Addressables'],
    links: {
      play: 'https://play.google.com/store/apps/details?id=com.ibagame.app',
      appstore: 'https://apps.apple.com/ru/app/iba-boxing/id6748807964',
    },
    descriptionLinks: {
      'International Boxing Association': 'https://www.iba.sport/',
    },
    featured: true,
  },
  {
    slug: 'idle-boxing',
    title: 'Idle Boxing',
    description:
      'Idle game about boxing published on Yandex Games. Progression-focused gameplay with idle mechanics, integrations with GamePush for leaderboards and achievements.',
    shortDescription: 'Idle boxing game on Yandex Games. Progression & leaderboards.',
    tags: ['Unity', 'C#', 'WebGL', 'Yandex Games', 'GamePush', 'UniRx'],
    links: { website: 'https://yandex.ru/games/app/449121' },
  },
  {
    slug: 'traffic-puzzle',
    title: 'Traffic Puzzle',
    description:
      'Puzzle game "Unblock the traffic" published on Yandex Games. Logic-based WebGL game with level progression, built for web with Yandex Games SDK integration.',
    shortDescription: 'WebGL traffic unblock puzzle on Yandex Games.',
    tags: ['Unity', 'C#', 'WebGL', 'Yandex Games'],
    links: { website: 'https://yandex.ru/games/app/399040' },
  },
  {
    slug: 'vr-base-defense',
    title: 'Cooperative VR Base Defense',
    description:
      'Cooperative VR shooter with base defense mechanics for commercial VR arenas, developed at VrReal. Players defend their base from waves of enemies in real-time multiplayer on a local network.',
    shortDescription: 'Co-op VR base defense shooter for commercial arenas.',
    tags: ['Unity', 'C#', 'VR', 'Hurricane VR', 'Unity Netcode', 'Multiplayer', 'Zenject'],
    links: { website: 'https://vr-real.ru/', youtube: 'https://disk.yandex.ru/i/SE3xxoz7BYzb_w' },
    featured: true,
  },
  {
    slug: 'vr-kids-games',
    title: 'VR Kids Games',
    description:
      'Collection of VR mini-games designed for children, developed at VrReal. Safe and engaging interactive experiences optimized for younger audiences in commercial VR arenas.',
    shortDescription: 'VR mini-games for children in commercial arenas.',
    tags: ['Unity', 'C#', 'VR', 'OpenXR', 'Hurricane VR', 'Zenject'],
    links: { website: 'https://vr-real.ru/', youtube: 'https://disk.yandex.ru/i/JRGhPn4InBjZ1g' },
  },
  {
    slug: 'vr-military-trainer',
    title: 'VR Military Training Simulator',
    description:
      'Networked VR training simulator for the military industry. First-person shooter supporting up to 10 players on a local network. Developed at Технопарк РГСУ.',
    shortDescription: 'Networked VR military training shooter. Up to 10 players, local multiplayer.',
    tags: ['Unity', 'C#', 'VR', 'OpenXR', 'Unity Netcode', 'MySQL', 'Blender'],
    links: {},
  },
  {
    slug: 'vr-social-trainer',
    title: 'VR Social Worker Trainer',
    description:
      'VR training simulator for social workers, developed at Технопарк РГСУ internship. Interactive scenario-based training in a virtual environment.',
    shortDescription: 'VR training simulator for social workers.',
    tags: ['Unity', 'C#', 'VR', 'OpenXR', 'UniRx'],
    links: { youtube: 'https://www.youtube.com/watch?v=9QFgNDqGM7s' },
  },
  {
    slug: 'vr-art-exhibition',
    title: 'VR Modern Art Exhibition',
    description:
      'Virtual reality exhibition of modern art, developed during internship at Технопарк РГСУ. Immersive gallery experience in VR.',
    shortDescription: 'Immersive VR gallery of modern art.',
    tags: ['Unity', 'C#', 'VR', 'OpenXR'],
    links: { youtube: 'https://www.youtube.com/watch?v=lTOtDunX6uw' },
  },
]
