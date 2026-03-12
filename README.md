# 🎮 losevdd.dev — Portfolio

<div align="center">

**[🌐 Live Demo](https://m-a-l-bl-lll.github.io/Portfolio/)**

*Unity Game Developer portfolio with a gamedev twist*

![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)

</div>

---

## 🇷🇺 Русский

### О проекте

Портфолио Unity-разработчика, стилизованное под игровой интерфейс. Здесь есть система XP, система квестов, мини-игра Space Invaders, пасхалки и 8-битные звуки — всё это прямо в браузере.

### ✨ Фичи

#### 🖥️ Интерфейс
- **Typewriter-эффект** — заголовок печатается при загрузке
- **Параллакс** — фон и контент движутся с разной скоростью при скролле
- **Scanlines** — CRT-эффект поверх страницы
- **Кастомный курсор** с glow-эффектом и ripple при клике
- **Floating particles** — парящие частицы на фоне
- **Переключатель языка** RU / EN
- **Анимация нажатия** — все кнопки сжимаются при клике

#### 🎮 Геймплей
- **Система XP** — получай очки за просмотр каждого раздела:
  - `+200 XP` Обо мне · `+500 XP` Опыт · `+300 XP` Навыки · `+1000 XP` Проекты · `+50 XP` Контакты
- **Level Up** — при накоплении XP повышается уровень (LVL 2–5) с золотой анимацией
- **Click Combo** — кликай много раз подряд чтобы получить `COMBO ×N` / `ULTRA COMBO` / `GODLIKE`
- **`[PRESS START]` Мини-игра** — полноценный Space Invaders прямо на главном экране:
  - Управление: `← →` / `A D` + `ПРОБЕЛ` для выстрела
  - 8-битные звуки: выстрел, взрыв пришельца, урон, победа, гейм-овер
  - Мобильные кнопки управления
  - Ачивка за победу
- **Типо-игра в Навыках** — вводи названия технологий и нажимай Enter чтобы «освоить» их

#### 📜 Quest Log (Проекты)
- Проекты открываются **последовательно** — следующий доступен только после открытия предыдущего
- **Locked-проекты** серые и недоступны, при клике подсказывают какой квест нужен
- **Прогресс-бар** `[ QUEST LOG: X / 10 COMPLETED ]`
- Каждый проект — квест с наградой в XP: `REWARD: +N XP`
- Статусы: `🔒 LOCKED` · `→ AVAILABLE` · `✓ COMPLETED`
- Кнопка **"Следующий квест →"** на странице каждого проекта
- Ачивка `🏅 Все квесты выполнены!` при прохождении всех

#### 🥚 Пасхалки
- **Тройной клик по имени** в хедере → ачивка `👾 Охотник за пасхалками` + `+777 XP`
- **Бездействие 30 секунд** → сообщение появляется по центру экрана и движется как DVD-скринсейвер
- **Loading Tips** — случайный совет по геймдеву при каждой загрузке страницы

#### 🔊 Звуки
- **Пиксельные звуки** на каждый клик (Web Audio API, 8-bit square wave)
- **Звуки мини-игры**: выстрел, взрыв пришельца, урон, гейм-овер, победа
- **Кнопка 🔇** для отключения всех звуков (сохраняется в localStorage)

#### 🏆 Достижения
- Ачивка при открытии каждого проекта
- Победа в Space Invaders
- Тройной клик по имени (пасхалка)
- Прохождение всего Quest Log

### 🛠️ Стек

![React](https://img.shields.io/badge/React_19-20232a?style=for-the-badge&logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-20232a?style=for-the-badge&logo=typescript&logoColor=3178c6)
![Vite](https://img.shields.io/badge/Vite-20232a?style=for-the-badge&logo=vite&logoColor=646cff)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-20232a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)
![Framer](https://img.shields.io/badge/Framer_Motion-20232a?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-20232a?style=for-the-badge&logo=reactrouter&logoColor=ca4245)
![Web Audio](https://img.shields.io/badge/Web_Audio_API-20232a?style=for-the-badge&logo=googlechrome&logoColor=white)

### 🚀 Запуск

```bash
npm install
npm run dev      # localhost:5173
npm run build    # сборка в dist/
```

---

## 🇬🇧 English

### About

A Unity Game Developer portfolio styled as a game UI. Features an XP system, quest log, Space Invaders mini-game, easter eggs, and 8-bit sounds — all in the browser.

### ✨ Features

#### 🖥️ UI & Visual Effects
- **Typewriter effect** — title types itself on load
- **Parallax scrolling** — background and content move at different speeds
- **Scanlines** — CRT overlay effect
- **Custom cursor** with glow and ripple on click
- **Floating particles** background
- **Scroll progress bar** at the top of the page
- **Language toggle** RU / EN
- **Press animation** — all buttons scale down on click

#### 🎮 Gameplay
- **XP System** — earn points by visiting each section:
  - `+200 XP` About · `+500 XP` Experience · `+300 XP` Skills · `+1000 XP` Projects · `+50 XP` Contact
- **Level Up** — accumulate XP to reach new levels (LVL 2–5) with a golden animation
- **Click Combo** — click repeatedly to trigger `COMBO ×N` / `ULTRA COMBO` / `GODLIKE`
- **`[PRESS START]` Mini-game** — a fully playable Space Invaders on the hero screen:
  - Controls: `← →` / `A D` + `SPACE` to shoot
  - 8-bit sounds: shoot, alien explosion, damage, game-over, win fanfare
  - Mobile touch controls
  - Achievement on win
- **Skills Typing Game** — type technology names and press Enter to "master" them

#### 📜 Quest Log (Projects)
- Projects unlock **sequentially** — next one is available only after visiting the previous
- **Locked projects** are greyed out with a hint on which quest to complete first
- **Progress bar** `[ QUEST LOG: X / 10 COMPLETED ]`
- Each project is a quest with an XP reward: `REWARD: +N XP`
- States: `🔒 LOCKED` · `→ AVAILABLE` · `✓ COMPLETED`
- **"Next Quest →"** button on each project page
- Achievement `🏅 All Quests Completed!` when all projects are visited

#### 🥚 Easter Eggs
- **Triple-click the name** in the header → `👾 Easter Egg Hunter` achievement + `+777 XP`
- **30 seconds of idle** → a message appears center-screen and bounces around DVD screensaver style
- **Loading Tips** — a random gamedev tip shown on every page load

#### 🔊 Sounds
- **Pixel click sounds** on every click (Web Audio API, 8-bit square wave)
- **Mini-game sounds**: shoot, alien explosion, damage, game-over, win fanfare
- **🔇 Mute button** to toggle all sounds (saved to localStorage)

#### 🏆 Achievements
- Achievement popup on each project visit
- Winning Space Invaders
- Finding the easter egg (triple-click)
- Completing the full Quest Log

### 🛠️ Tech Stack

![React](https://img.shields.io/badge/React_19-20232a?style=for-the-badge&logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-20232a?style=for-the-badge&logo=typescript&logoColor=3178c6)
![Vite](https://img.shields.io/badge/Vite-20232a?style=for-the-badge&logo=vite&logoColor=646cff)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-20232a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)
![Framer](https://img.shields.io/badge/Framer_Motion-20232a?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-20232a?style=for-the-badge&logo=reactrouter&logoColor=ca4245)
![Web Audio](https://img.shields.io/badge/Web_Audio_API-20232a?style=for-the-badge&logo=googlechrome&logoColor=white)

### 🚀 Getting Started

```bash
npm install
npm run dev      # localhost:5173
npm run build    # production build → dist/
```

---

<div align="center">

Made with 🎮 by [losevdd](https://github.com/M-A-L-bl-LLl)

</div>
