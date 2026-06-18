"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// ============================================
// ДАННЫЕ
// ============================================

const navItems = [
  { title: "Новости", href: "#news" },
  { title: "Кибербезопасность", href: "#cyber", badge: "LIVE" },
  { title: "Технологии", href: "#tech" },
  { title: "О городе", href: "#city" },
  { title: "События", href: "#events" },
  { title: "Контакты", href: "#contacts" },
];

const securityAlerts = [
  "🛡️ Никогда не сообщайте PIN-код по телефону — банк этого никогда не просит",
  "⚠️ Звонят из «банка»? Положите трубку и перезвоните сами по официальному номеру",
  "🔒 Включите двухфакторную аутентификацию на всех важных аккаунтах",
  "🚨 Мошенники создают копии сайтов — проверяйте адрес в браузере",
  "💡 Не открывайте файлы из неизвестных источников — это может быть вирус",
];

const news = [
  {
    id: 1,
    category: "Пинск",
    title: "Реконструкция набережной реки Пины завершится к лету 2025",
    excerpt: "Обновлённая набережная получит велодорожки, зоны отдыха и современное освещение.",
    time: "2 часа назад",
    emoji: "🌊",
    breaking: false,
    big: true,
  },
  {
    id: 2,
    category: "Кибербезопасность",
    title: "Новая волна фишинговых атак через Telegram-боты",
    excerpt: "Мошенники маскируются под сотрудников банков и государственных служб.",
    time: "45 мин назад",
    emoji: "🛡️",
    breaking: true,
    big: false,
  },
  {
    id: 3,
    category: "AI",
    title: "Google DeepMind представил AlphaFold 3 для медицины",
    excerpt: "Новая нейросеть способна предсказывать структуру любых молекул с рекордной точностью.",
    time: "1 час назад",
    emoji: "🤖",
    breaking: false,
    big: false,
  },
  {
    id: 4,
    category: "Беларусь",
    title: "Новый IT-кластер в Бресте откроет 2000 рабочих мест",
    excerpt: "Проект ориентирован на разработку программного обеспечения и искусственный интеллект.",
    time: "3 часа назад",
    emoji: "💻",
    breaking: false,
    big: false,
  },
  {
    id: 5,
    category: "Технологии",
    title: "Samsung Galaxy S26 Ultra: первые официальные характеристики",
    excerpt: "Флагман получит 200МП камеру, 7 лет обновлений и встроенный AI-ассистент.",
    time: "5 часов назад",
    emoji: "📱",
    breaking: false,
    big: false,
  },
  {
    id: 6,
    category: "Мир",
    title: "ООН приняла первую резолюцию по регулированию ИИ",
    excerpt: "Все 193 страны поддержали документ о безопасном и ответственном развитии ИИ.",
    time: "6 часов назад",
    emoji: "🌍",
    breaking: false,
    big: false,
  },
];

const cyberThreats = [
  {
    level: "critical",
    label: "КРИТИЧНО",
    title: "Ransomware атакует белорусские компании",
    desc: "Шифровальщик LockBit 4.0 распространяется через заражённые документы Word и Excel.",
    time: "30 мин назад",
    type: "Вымогатель",
    color: "red",
  },
  {
    level: "high",
    label: "ВЫСОКИЙ",
    title: "Фишинг от имени Беларусбанка",
    desc: "Поддельные письма просят подтвердить данные карты. Не переходите по ссылкам!",
    time: "1 час назад",
    type: "Фишинг",
    color: "orange",
  },
  {
    level: "high",
    label: "ВЫСОКИЙ",
    title: "Мошеннические колл-центры звонят из Украины",
    desc: "Представляются сотрудниками КГБ или прокуратуры, требуют перевести деньги.",
    time: "2 часа назад",
    type: "Мошенничество",
    color: "orange",
  },
  {
    level: "medium",
    label: "СРЕДНИЙ",
    title: "Уязвимость в роутерах TP-Link",
    desc: "CVE-2025-1234: обновите прошивку роутера до последней версии немедленно.",
    time: "3 часа назад",
    type: "Уязвимость",
    color: "yellow",
  },
];

const cityStats = [
  { emoji: "👥", value: "125K+", label: "Население" },
  { emoji: "🏰", value: "1097", label: "Год основания" },
  { emoji: "🏛️", value: "130+", label: "Памятников" },
  { emoji: "🎓", value: "40+", label: "Учреждений" },
];

const techCards = [
  { emoji: "🤖", title: "Искусственный интеллект", desc: "GPT-5, Gemini Ultra, Claude 4 — последние новости AI" },
  { emoji: "🔐", title: "Кибербезопасность", desc: "Zero-day уязвимости, защита данных, VPN и шифрование" },
  { emoji: "🥽", title: "AR/VR/XR", desc: "Apple Vision Pro, Meta Quest, смешанная реальность" },
  { emoji: "🚀", title: "Космос", desc: "SpaceX, Роскосмос, лунные миссии и спутники" },
  { emoji: "🧬", title: "Биотехнологии", desc: "CRISPR, генная инженерия, медицина будущего" },
  { emoji: "⚡", title: "Зелёные технологии", desc: "Солнечная энергия, водород, устойчивое развитие" },
];

// ============================================
// КОМПОНЕНТЫ
// ============================================

function SecurityBanner() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % securityAlerts.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-gray-950 border-b border-green-500/20 overflow-hidden">
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-green-500 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-green-400 text-xs font-mono font-bold hidden sm:block">SEC</span>
        </div>
        <p className="text-gray-300 text-xs sm:text-sm font-mono flex-1 text-center">
          {securityAlerts[current]}
        </p>
        <button
          onClick={() => setVisible(false)}
          className="text-gray-600 hover:text-green-400 transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        timeZone: "Europe/Minsk",
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled
        ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50 py-2"
        : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

        {/* Логотип */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30">
              <span className="text-white font-bold text-xl">П</span>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative flex h-3 w-3 rounded-full bg-green-500" />
            </span>
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-lg leading-tight">
              <span className="text-gradient">Пинск</span>
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-mono uppercase tracking-widest">
              Столица Полесья
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
            >
              {item.title}
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full animate-pulse">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Правая часть */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 text-xs font-mono text-gray-500 dark:text-gray-400">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{time}</span>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
          >
            {dark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={cn("block h-0.5 w-5 bg-gray-700 dark:bg-gray-300 rounded transition-all", mobileOpen && "rotate-45 translate-y-1.5")} />
              <span className={cn("block h-0.5 w-5 bg-gray-700 dark:bg-gray-300 rounded transition-all", mobileOpen && "opacity-0")} />
              <span className={cn("block h-0.5 w-5 bg-gray-700 dark:bg-gray-300 rounded transition-all", mobileOpen && "-rotate-45 -translate-y-2")} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-xl">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-800 dark:text-gray-200 font-medium hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {item.title}
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    setLoaded(true);
    const onMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 20);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">

      {/* Градиентные шары */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #3b8ff6, transparent 70%)",
          transform: `translate(${mouseX}px, ${mouseY}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #fbbf24, transparent 70%)",
          transform: `translate(${-mouseX}px, ${-mouseY}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Частицы */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animation: `float ${5 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3) % 5}s`,
            }}
          />
        ))}
      </div>

      {/* Контент */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">

        {/* Бейдж */}
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8",
          "bg-white/5 border border-white/10 backdrop-blur-sm",
          "transition-all duration-700",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-gray-300 text-sm font-mono">
            Добро пожаловать в цифровой Пинск
          </span>
        </div>

        {/* Заголовок */}
        <h1 className={cn(
          "font-bold leading-tight mb-6 transition-all duration-700 delay-100",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <span className="block text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight">
            ПИНСК
          </span>
          <span className="block text-gradient text-2xl sm:text-3xl md:text-4xl font-light mt-2">
            Столица Полесья · Беларусь
          </span>
        </h1>

        {/* Подзаголовок */}
        <p className={cn(
          "text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          Древний город с тысячелетней историей. Актуальные новости, 
          кибербезопасность, технологии и события — всё в одном месте.
        </p>

        {/* Кнопки */}
        <div className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <a
            href="#news"
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Читать новости
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#cyber"
            className="group px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-green-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Кибербезопасность
          </a>
        </div>

        {/* Статистика */}
        <div className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto transition-all duration-700 delay-500",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          {cityStats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-xl p-4 text-center hover:bg-white/10 transition-all hover:scale-105 cursor-default"
            >
              <span className="text-2xl block mb-1">{s.emoji}</span>
              <span className="block text-xl font-bold text-white">{s.value}</span>
              <span className="block text-xs text-gray-400 font-mono mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Скролл */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-3 rounded-full bg-white/40 animate-fade-up" />
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section id="news" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-blue-500 font-mono text-sm font-semibold uppercase tracking-wider">
              Актуально
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-1">
              Последние <span className="text-gradient">новости</span>
            </h2>
          </div>
          <a href="/news" className="hidden sm:flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors font-medium">
            Все новости
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, i) => (
            <article
              key={article.id}
              className={cn(
                "group relative rounded-2xl overflow-hidden cursor-pointer",
                "bg-white dark:bg-gray-900",
                "border border-gray-200 dark:border-gray-800",
                "hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5",
                "transition-all duration-500 hover:-translate-y-1",
                article.big && i === 0 ? "md:col-span-2" : ""
              )}
            >
              {/* Картинка */}
              <div className={cn(
                "flex items-center justify-center",
                "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
                article.big && i === 0 ? "h-52" : "h-36"
              )}>
                <span className={cn("transition-transform group-hover:scale-110", article.big && i === 0 ? "text-6xl" : "text-4xl")}>
                  {article.emoji}
                </span>
              </div>

              {/* Контент */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {article.breaking && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full animate-pulse">
                      СРОЧНО
                    </span>
                  )}
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{article.time}</span>
                </div>
                <h3 className={cn(
                  "font-bold mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",
                  article.big && i === 0 ? "text-xl" : "text-base"
                )}>
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CyberSection() {
  const colorMap: Record<string, string> = {
    red: "text-red-400 bg-red-500/10 border-red-500/20",
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    green: "text-green-400 bg-green-500/10 border-green-500/20",
  };

  const dotMap: Record<string, string> = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
  };

  return (
    <section id="cyber" className="py-20 lg:py-28 relative bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-green-400 text-sm font-mono">МОНИТОРИНГ В РЕАЛЬНОМ ВРЕМЕНИ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Кибер<span className="text-gradient-cyber">безопасность</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Актуальные угрозы, атаки и советы по защите от мошенников и хакеров
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {cyberThreats.map((threat, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl p-5 border transition-all hover:scale-[1.01] cursor-pointer",
                colorMap[threat.color]
              )}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1.5 shrink-0">
                  <span className={cn("flex h-2.5 w-2.5 rounded-full", dotMap[threat.color], threat.color === "red" && "animate-pulse")} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={cn("text-xs font-mono font-bold", colorMap[threat.color].split(" ")[0])}>
                      [{threat.label}]
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{threat.type}</span>
                    <span className="text-xs text-gray-600 font-mono ml-auto">{threat.time}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{threat.title}</h3>
                  <p className="text-sm text-gray-400">{threat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Советы */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: "🔐", title: "Сильный пароль", tip: "Минимум 12 символов: буквы, цифры, символы" },
            { icon: "📵", title: "Незнакомые звонки", tip: "Не сообщайте данные. Перезвоните сами." },
            { icon: "🔗", title: "Подозрительные ссылки", tip: "Проверяйте URL перед кликом" },
            { icon: "🔄", title: "Обновления", tip: "Обновляйте ОС и приложения регулярно" },
          ].map((tip, i) => (
            <div
              key={i}
              className="glass rounded-xl p-4 text-center hover:bg-white/10 transition-all hover:scale-105"
            >
              <span className="text-3xl block mb-2">{tip.icon}</span>
              <h4 className="text-white font-semibold text-sm mb-1">{tip.title}</h4>
              <p className="text-gray-400 text-xs">{tip.tip}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/cyber-security"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-semibold hover:bg-green-500/20 transition-all hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Центр кибербезопасности
          </a>
        </div>
      </div>
    </section>
  );
}

function TechSection() {
  return (
    <section id="tech" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-blue-500 font-mono text-sm font-semibold uppercase tracking-wider">
            Технологии 2026
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-1">
            Передовые <span className="text-gradient">технологии</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCards.map((card, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            >
              <span className="text-4xl block mb-4 transition-transform group-hover:scale-110">{card.emoji}</span>
              <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CitySection() {
  return (
    <section id="city" className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-950/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-500 font-mono text-sm font-semibold uppercase tracking-wider">
              Полесская столица
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-1 mb-6">
              Город <span className="text-gradient">Пинск</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
              Один из древнейших городов Беларуси, впервые упомянутый в летописях в <strong>1097 году</strong>. 
              Расположен в сердце Полесья, на слиянии рек Пина и Припять.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Город известен уникальной архитектурой: иезуитским коллегиумом, францисканским монастырём, 
              дворцом Бутримовича. Пинск — культурный, образовательный и экономический центр Полесья.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {cityStats.map((s) => (
                <div
                  key={s.label}
                  className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center"
                >
                  <span className="text-2xl block mb-1">{s.emoji}</span>
                  <span className="block text-xl font-bold">{s.value}</span>
                  <span className="block text-xs text-gray-500 font-mono mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Карта-заглушка */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-500/20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-30" />
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-blue-300 font-mono text-sm">Интерактивная карта</p>
                <p className="text-blue-400/60 font-mono text-xs mt-1">Пинск, Беларусь</p>
                <p className="text-blue-400/40 font-mono text-xs">52.1229° N, 26.0951° E</p>
              </div>
              {/* Декоративные элементы */}
              <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-blue-500/30 animate-pulse" />
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500/20" />
              <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-blue-500/20" />
              <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-green-500/30 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">П</span>
              </div>
              <div>
                <span className="font-bold text-lg text-gradient">Пинск</span>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Столица Полесья</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Официальный информационный портал города Пинска. Новости, события, кибербезопасность и технологии.
            </p>
          </div>

          {[
            {
              title: "Разделы",
              links: ["Новости", "Кибербезопасность", "Технологии", "AI Hub", "События"],
            },
            {
              title: "Город",
              links: ["О Пинске", "История", "Галерея", "Транспорт", "Контакты"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-mono">
            © {year} Пинск — Городской портал. Все права защищены.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-blue-500 transition-colors">Конфиденциальность</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Условия</a>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Работает стабильно
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// ГЛАВНЫЙ КОМПОНЕНТ
// ============================================

export default function HomePage() {
  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="dark">
      <SecurityBanner />
      <Header />
      <main>
        <Hero />
        <NewsSection />
        <CyberSection />
        <TechSection />
        <CitySection />
      </main>
      <Footer />
    </div>
  );
}
