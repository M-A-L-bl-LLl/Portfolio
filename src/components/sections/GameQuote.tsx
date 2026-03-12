import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { useScramble } from '../../hooks/useScramble'

const QUOTES = [
  {
    en: { text: "I used to be an adventurer like you. Then I took an arrow in the knee.", game: "Skyrim guard, probably on his 5th arrow" },
    ru: { text: "Я тоже был авантюристом, пока не получил стрелу в колено.", game: "Страж из Скайрима, уже 5-я стрела" },
  },
  {
    en: { text: "It's a-me, Mario! ...Sorry, wrong meeting.", game: "Super Mario, joining a Teams call" },
    ru: { text: "Это я, Марио! ...Простите, не в ту конференцию.", game: "Марио, входящий не в тот созвон" },
  },
  {
    en: { text: "The cake is a lie. The overtime is real.", game: "Portal / Every Game Jam Ever" },
    ru: { text: "Торт — ложь. Овертайм — реальность.", game: "Portal / Каждый геймджем" },
  },
  {
    en: { text: "YOU DIED. Have you tried reading the tutorial?", game: "Dark Souls loading screen (fan edition)" },
    ru: { text: "ВЫ ПОГИБЛИ. Может, прочитаете обучение?", game: "Dark Souls экран загрузки (фанатская версия)" },
  },
  {
    en: { text: "Do a barrel roll! — Peppy, ignoring all other tactical options.", game: "Star Fox 64" },
    ru: { text: "Сделай бочку! — Пеппи, игнорируя все другие тактики.", game: "Star Fox 64" },
  },
  {
    en: { text: "All your base are belong to us. We have also taken the snacks.", game: "Zero Wing (extended cut)" },
    ru: { text: "Все ваши базы принадлежат нам. Перекусы тоже забрали.", game: "Zero Wing (расширенная версия)" },
  },
  {
    en: { text: "I need scissors! 61! ...I also need a therapist.", game: "Metal Gear Solid 2, Colonel AI" },
    ru: { text: "Мне нужны ножницы! 61! ...И психолог тоже нужен.", game: "Metal Gear Solid 2, полковник ИИ" },
  },
  {
    en: { text: "Hey! Listen! Hey! Listen! Hey! Listen! ...Are you still there?", game: "Navi, The Legend of Zelda: Ocarina of Time" },
    ru: { text: "Эй! Слушай! Эй! Слушай! Эй! Слушай! ...Ты ещё здесь?", game: "Нави, The Legend of Zelda: Ocarina of Time" },
  },
  {
    en: { text: "Attention all units! Attention all units! ...I have forgotten what I was announcing.", game: "GTA San Andreas radio, extended" },
    ru: { text: "Внимание всем подразделениям! Внимание всем подразделениям! ...Забыл, что хотел сказать.", game: "Радио GTA San Andreas, расширенная версия" },
  },
  {
    en: { text: "You've met with a terrible fate, haven't you? (Yes, I bought the DLC.)", game: "Happy Mask Salesman, Majora's Mask" },
    ru: { text: "Тебя постигла ужасная судьба, не так ли? (Да, я купил DLC.)", game: "Продавец масок, Majora's Mask" },
  },
  {
    en: { text: "Respawning in 3... 2... 1... Respawning in 3... 2... 1... Respawning in 3...", game: "Every online shooter I've ever played" },
    ru: { text: "Воскрешение через 3... 2... 1... Через 3... 2... 1... Через 3...", game: "Каждый онлайн-шутер в моей жизни" },
  },
  {
    en: { text: "You picked up: Rock. Your inventory is full. Rock was discarded.", game: "Classic RPG, item management" },
    ru: { text: "Вы подобрали: Камень. Инвентарь заполнен. Камень выброшен.", game: "Классическая RPG, управление инвентарём" },
  },
  {
    en: { text: "Loading... Loading... Loading... Did you know: you are still loading?", game: "Any open world game, launch day" },
    ru: { text: "Загрузка... Загрузка... Загрузка... Знаете ли вы: вы всё ещё загружаетесь?", game: "Любой опен-ворлд в день релиза" },
  },
  {
    en: { text: "Critical hit! Enemy missed. Enemy missed. Enemy missed. You are dead.", game: "XCOM, classic experience" },
    ru: { text: "Критический удар! Враг промахнулся. Промахнулся. Промахнулся. Вы мертвы.", game: "XCOM, классический опыт" },
  },
  {
    en: { text: "New save file created. Previous save file: 312 hours. Farewell, old friend.", game: "The Elder Scrolls, new playthrough" },
    ru: { text: "Создан новый файл сохранения. Предыдущий: 312 часов. Прощай, старый друг.", game: "The Elder Scrolls, новое прохождение" },
  },
  {
    en: { text: "Error: Cannot connect to server. Would you like to play offline? No. Then goodbye.", game: "Always-online DRM simulator" },
    ru: { text: "Ошибка: нет соединения с сервером. Играть офлайн? Нет. Тогда до свидания.", game: "Симулятор обязательного онлайна" },
  },
  {
    en: { text: "Friendly reminder: your teammates have reported you for being too good at the game.", game: "Any competitive game, silver elo" },
    ru: { text: "Напоминание: тиммейты пожаловались на вас за слишком хорошую игру.", game: "Любая соревновательная игра, серебро" },
  },
  {
    en: { text: "Tutorial: Press X to jump. Press X. PRESS X. WHY AREN'T YOU PRESSING X.", game: "Every tutorial ever, frustrated developer edition" },
    ru: { text: "Туториал: нажмите X чтобы прыгнуть. Нажмите X. НАЖМИТЕ X. ПОЧЕМУ ВЫ НЕ НАЖИМАЕТЕ X.", game: "Каждый туториал когда-либо, разработчик в отчаянии" },
  },
  {
    en: { text: "Stay a while and listen. No, seriously — sit down, this takes 45 minutes.", game: "Deckard Cain, Diablo II" },
    ru: { text: "Задержись и выслушай. Нет, серьёзно — садись, это на 45 минут.", game: "Декард Каин, Diablo II" },
  },
  {
    en: { text: "War. War never changes. My Wi-Fi, however, changes constantly.", game: "Fallout narrator, relatable version" },
    ru: { text: "Война. Война никогда не меняется. А вот мой Wi-Fi — постоянно.", game: "Рассказчик Fallout, актуальная версия" },
  },
  {
    en: { text: "Press F to pay respects. Press F again. And again. Nothing happened? Press F.", game: "Call of Duty: Advanced Warfare tutorial" },
    ru: { text: "Нажмите F, чтобы отдать дань уважения. Ещё раз. Ещё. Не работает? Жмите F.", game: "Туториал Call of Duty: Advanced Warfare" },
  },
  {
    en: { text: "FINISH HIM! ...He's already at 99% health, Shao Kahn.", game: "Mortal Kombat, Round 1" },
    ru: { text: "ДОБЕЙ ЕГО! ...У него 99% здоровья, Шао Кан.", game: "Mortal Kombat, раунд 1" },
  },
  {
    en: { text: "Praise the Sun! \\[T]/ (This is my entire personality now.)", game: "Dark Souls player, 1200 hours in" },
    ru: { text: "Слава Солнцу! \\[T]/ (Это теперь вся моя личность.)", game: "Игрок Dark Souls, 1200 часов" },
  },
  {
    en: { text: "It's dangerous to go alone! Take this. (It's a wooden stick. Good luck.)", game: "The Legend of Zelda, honest edition" },
    ru: { text: "Одному идти опасно! Возьми это. (Это деревянная палка. Удачи.)", game: "The Legend of Zelda, честная версия" },
  },
  {
    en: { text: "Snake? Snake! SNAAAKE! — This is why I don't do standups.", game: "Metal Gear Solid, daily scrum" },
    ru: { text: "Снейк? Снейк! СНЕЕЕЙК! — Вот почему я не хожу на стендапы.", game: "Metal Gear Solid, ежедневный скрам" },
  },
  {
    en: { text: "MEDIC! — every teammate, the moment I respawn.", game: "Team Fortress 2, personal experience" },
    ru: { text: "МЕДИК! — каждый тиммейт в момент моего респауна.", game: "Team Fortress 2, личный опыт" },
  },
  {
    en: { text: "This game is not hard. Git gud. (Said the person with 3000 hours.)", game: "Dark Souls community, honest subtitle" },
    ru: { text: "Игра не сложная. Качайся. (Говорит человек с 3000 часами.)", game: "Комьюнити Dark Souls, честный субтитр" },
  },
  {
    en: { text: "Would you kindly... stop dying and let me finish this cutscene?", game: "BioShock, co-op mod" },
    ru: { text: "Не будешь ли так любезен... перестать умирать во время катсцены?", game: "BioShock, кооперативный мод" },
  },
  {
    en: { text: "It's super effective! (Your wallet was not.", game: "Pokémon, in-game shop" },
    ru: { text: "Это очень эффективно! (Ваш кошелёк — нет.)", game: "Pokémon, внутриигровой магазин" },
  },
  {
    en: { text: "You must construct additional pylons. You must also construct additional pylons. Have you considered pylons?", game: "StarCraft advisor, final form" },
    ru: { text: "Вы должны построить дополнительные пилоны. И ещё пилоны. Думали о пилонах?", game: "Советник StarCraft, финальная форма" },
  },
  {
    en: { text: "Achievement Unlocked: Spent 6 hours in character creation, played 10 minutes.", game: "Every RPG ever" },
    ru: { text: "Достижение разблокировано: 6 часов в создании персонажа, 10 минут игры.", game: "Каждая RPG вообще" },
  },
]

export default function GameQuote() {
  const { lang } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [index, setIndex] = useState(() => Math.floor(Math.random() * QUOTES.length))

  function reroll() {
    setIndex(i => {
      let next
      do { next = Math.floor(Math.random() * QUOTES.length) } while (next === i && QUOTES.length > 1)
      return next
    })
  }

  const quote = QUOTES[index][lang as 'en' | 'ru']
  const scrambledText = useScramble(quote.text, inView, 8)

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative p-8 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          {/* Corner decorations */}
          {[
            { top: 8, left: 8 },
            { top: 8, right: 8 },
            { bottom: 8, left: 8 },
            { bottom: 8, right: 8 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 10,
                height: 10,
                borderColor: 'var(--color-accent)',
                borderStyle: 'solid',
                borderWidth: 0,
                borderTopWidth: pos.top !== undefined ? 1.5 : 0,
                borderBottomWidth: pos.bottom !== undefined ? 1.5 : 0,
                borderLeftWidth: pos.left !== undefined ? 1.5 : 0,
                borderRightWidth: pos.right !== undefined ? 1.5 : 0,
                opacity: 0.6,
                ...pos,
              }}
            />
          ))}

          <div style={{ minHeight: '130px' }}>
            {/* Open quote */}
            <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '3.5rem',
                lineHeight: 0.8,
                color: 'var(--color-accent)',
                marginBottom: '0.75rem',
                userSelect: 'none',
              }}
            >
              "
            </div>

            {/* Quote text with scramble effect */}
            <div style={{ overflow: 'hidden', minHeight: '5.5em' }}>
              <p
                className="text-lg sm:text-xl leading-relaxed mb-4"
                style={{ color: 'var(--color-text)', fontStyle: 'italic' }}
              >
                {scrambledText}
              </p>
            </div>

            {/* Attribution */}
            <p
              className="font-mono text-xs"
              style={{ color: 'var(--color-muted)', letterSpacing: '0.05em' }}
            >
              — {quote.game}
            </p>
          </div>

          {/* Reroll button */}
          <button
            onClick={reroll}
            className="font-mono text-xs mt-6 cursor-pointer"
            style={{
              color: 'var(--color-muted)',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: '0.375rem',
              padding: '0.35rem 0.85rem',
              letterSpacing: '0.1em',
              transition: 'color 0.15s, border-color 0.15s',
              display: 'block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--color-accent)'
              e.currentTarget.style.borderColor = 'var(--color-accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--color-muted)'
              e.currentTarget.style.borderColor = 'var(--color-border)'
            }}
          >
            ⟳ {lang === 'ru' ? 'ДРУГАЯ ЦИТАТА' : 'NEXT QUOTE'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
