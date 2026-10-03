import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logoSrc from '../assets/logo.png'
import heroPhoto from '../assets/game-covers/football.JPG'
import LanguageSwitcher from '../components/LanguageSwitcher'
import Icon, { SportIcon } from '../components/Icon'
import ThemeToggle from '../components/ThemeToggle'
import { DEFAULT_SPORT_IMAGE, getSportImage } from '../utils/sportMedia'
import '../styles/Welcome.css'

const MOCK_GAMES = [
 {
  id: '1',
  titleKey: 'welcome.weekendFootball',
  sport: 'football',
  sportName: 'football',
  venue: 'Spartak Stadium',
  date: '2026-10-05T18:00:00',
  players: '6/10',
  status: 'open',
  image: getSportImage('football'),
 },
 {
  id: '2',
  titleKey: 'welcome.basketballCup',
  sport: 'basketball',
  sportName: 'basketball',
  venue: 'Ala-Too Sports Palace',
  date: '2026-10-06T19:30:00',
  players: '8/10',
  status: 'open',
  image: getSportImage('basketball'),
 },
 {
  id: '3',
  titleKey: 'welcome.volleyballLeague',
  sport: 'volleyball',
  sportName: 'volleyball',
  venue: 'Manas Sports Hall',
  date: '2026-10-08T18:30:00',
  players: '6/6',
  status: 'full',
  image: getSportImage('volleyball'),
 },
]

export default function Welcome({ onStartDemo }) {
 const [isVisible, setIsVisible] = useState({})
 const { t, i18n } = useTranslation()
 const formatGameDate = (value) => new Intl.DateTimeFormat(i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
 }).format(new Date(value))
 const demoEnabled = typeof onStartDemo === 'function'
 const contactItems = [
  {
  icon: 'chat',
   label: t('welcome.contactWhatsapp'),
   value: '+996 500 097 582',
   href: 'https://wa.me/996500097582',
   className: 'contact-whatsapp',
  },
  {
  icon: 'instagram',
   label: t('welcome.contactInstagram'),
   value: '@teamup_kg',
   href: 'https://www.instagram.com/teamup_kg/',
   className: 'contact-instagram',
  },
  {
  icon: 'mail',
   label: t('welcome.contactEmail'),
   value: 'teamup.fip14@gmail.com',
   href: 'https://mail.google.com/mail/view=cm&fs=1&to=teamup.fip14@gmail.com',
   className: 'contact-email',
  },
 ]

 const handleCoverError = (event) => {
  if (event.currentTarget.dataset.fallbackApplied === 'true') return
  event.currentTarget.dataset.fallbackApplied = 'true'
  event.currentTarget.src = DEFAULT_SPORT_IMAGE
 }

 useEffect(() => {
  const observer = new IntersectionObserver(
   (entries) => {
    entries.forEach((entry) => {
     if (entry.isIntersecting) {
      setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
     }
    })
   },
   { threshold: 0.1 }
  )

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
   observer.observe(el)
  })

  return () => observer.disconnect()
 }, [])

 return (
  <div className="welcome-page-new">
   {/* Announcement Banner */}
   <div className="announcement-banner">
    <span className="flag">🇰🇬</span> {t('welcome.announcement')}
   </div>

   {/* Navigation */}
   <nav className="welcome-nav">
    <div className="nav-brand-logo">
     <img src={logoSrc} alt="TeamUp" className="logo-img" />
     <span>TeamUp</span>
    </div>
    <div className="nav-links-center">
     <a href="#how">{t('welcome.howItWorks')}</a>
     <a href="#games">{t('welcome.games')}</a>
     <a href="#sports">{t('welcome.sports')}</a>
    </div>
    <div className="nav-auth">
      <ThemeToggle />
     <LanguageSwitcher className="welcome-language-switcher" />
     <Link to="/login" className="nav-login">{t('welcome.login')}</Link>
     <Link to="/register" className="nav-register">{t('welcome.register')}</Link>
    </div>
   </nav>

   {/* Hero Section */}
   <section className="hero-new">
    <div className="hero-content">
      <span className="hero-kicker">{t('welcome.announcement')}</span>
     <h1 className="hero-title">
      {t('welcome.heroTitle1')}<br />
      <span className="gradient-text">{t('welcome.heroTitle2')}</span>
     </h1>
     <p className="hero-subtitle">{t('welcome.heroSubtitle')}</p>
    <div className="hero-actions">
     <Link to="/register" className="btn-primary-new">{t('welcome.getStarted')}</Link>
     <Link to="/login" className="btn-secondary-new">{t('welcome.login')}</Link>
    </div>
     
     {/* Stats Badges */}
    <div className="hero-stats hero-stats-strip">
      <div className="stat-badge">
      <span className="stat-icon"><Icon name="users" size={18} /></span>
       <span className="stat-value">200+</span>
       <span className="stat-label">{t('welcome.players')}</span>
      </div>
      <div className="stat-badge">
      <span className="stat-icon"><Icon name="building" size={18} /></span>
       <span className="stat-value">50+</span>
       <span className="stat-label">{t('welcome.venues')}</span>
      </div>
      <div className="stat-badge">
      <span className="stat-icon"><Icon name="users" size={18} /></span>
       <span className="stat-value">5+</span>
       <span className="stat-label">{t('welcome.partners')}</span>
      </div>
     </div>
    </div>
    <div className="hero-photo" aria-hidden="true">
     <img src={heroPhoto} alt="" />
    </div>
   </section>

   {/* How It Works */}
   <section id="how" className="section-how animate-on-scroll">
    <h2 className="section-title">{t('welcome.howTitle')}</h2>
    <p className="section-subtitle">{t('welcome.howSubtitle')}</p>
    
    <div className="steps-container">
     <div className="step-card">
      <div className="step-number">01</div>
      <div className="step-icon"><Icon name="user" size={20} /></div>
      <h3>{t('welcome.step1Title')}</h3>
      <p>{t('welcome.step1Desc')}</p>
     </div>
     <div className="step-card">
      <div className="step-number">02</div>
      <div className="step-icon"><Icon name="search" size={20} /></div>
      <h3>{t('welcome.step2Title')}</h3>
      <p>{t('welcome.step2Desc')}</p>
     </div>
     <div className="step-card">
      <div className="step-number">03</div>
      <div className="step-icon"><Icon name="trophy" size={20} /></div>
      <h3>{t('welcome.step3Title')}</h3>
      <p>{t('welcome.step3Desc')}</p>
     </div>
    </div>
   </section>

   {demoEnabled && (
    <section className="section-demo-entry animate-on-scroll">
     <div className="demo-entry-shell">
      <div className="demo-entry-copy">
       <span className="demo-entry-kicker">{t('welcome.demoKicker')}</span>
       <h2 className="section-title">{t('welcome.demoTitle')}</h2>
       <p className="section-subtitle demo-entry-subtitle">{t('welcome.demoSubtitle')}</p>
      </div>
      <div className="demo-entry-actions">
       <button type="button" className="btn-primary-new demo-entry-btn" onClick={onStartDemo}>
        {t('welcome.demoAction')}
       </button>
       <p className="demo-entry-note">{t('welcome.demoNote')}</p>
      </div>
     </div>
    </section>
   )}

   {/* Sports Section */}
   <section id="sports" className="section-sports animate-on-scroll">
    <h2 className="section-title">{t('welcome.sportsTitle')}</h2>
    <p className="section-subtitle">{t('welcome.sportsSubtitle')}</p>
    
    <div className="sports-grid">
     <div className="sport-card sport-football">
      <span className="sport-emoji"><SportIcon name="football" size={22} /></span>
      <h3>{t('welcome.football')}</h3>
      <p className="sport-count">{t('welcome.footballAction')}</p>
     </div>
     <div className="sport-card sport-basketball">
      <span className="sport-emoji"><SportIcon name="basketball" size={22} /></span>
      <h3>{t('welcome.basketball')}</h3>
      <p className="sport-count">{t('welcome.basketballAction')}</p>
     </div>
     <div className="sport-card sport-volleyball">
      <span className="sport-emoji"><SportIcon name="volleyball" size={22} /></span>
      <h3>{t('welcome.volleyball')}</h3>
      <p className="sport-count">{t('welcome.volleyballAction')}</p>
     </div>
    </div>
   </section>

   {/* Popular Games */}
   <section id="games" className="section-games animate-on-scroll">
    <div className="section-header-row">
     <div>
      <h2 className="section-title">{t('welcome.popularTitle')}</h2>
      <p className="section-subtitle">{t('welcome.popularSubtitle')}</p>
     </div>
    <Link to="/login" className="view-all-btn">{t('welcome.viewAll')}</Link>
    </div>
    
    <div className="games-grid">
     {MOCK_GAMES.map((game) => (
      <div key={game.id} className="game-card-new">
       <div className="game-image-container">
        <img
         src={game.image}
         alt={t(game.titleKey)}
         className="game-image"
         loading="lazy"
         onError={handleCoverError}
        />
        <div className={`game-status-badge ${game.status}`}>
         ● {game.status === 'open' ? t('welcome.open') : t('welcome.full')}
        </div>
         <div className="game-sport-badge"><SportIcon name={game.sportName} size={16} /></div>
       </div>
       <div className="game-info">
        <h3>{t(game.titleKey)}</h3>
        <div className="game-meta">
         <span><Icon name="map-pin" size={14} /> {game.venue}</span>
         <span><Icon name="calendar" size={14} /> {formatGameDate(game.date)}</span>
         <span><Icon name="users" size={14} /> {game.players}</span>
        </div>
        <Link to="/login" className="game-join-btn">{t('welcome.join')}</Link>
       </div>
      </div>
     ))}
    </div>
   </section>

  <section className="partner-callout animate-on-scroll">
   <div className="partner-callout-icon"><Icon name="building" size={22} /></div>
   <div className="partner-callout-copy">
    <h2>{t('welcome.partnerCalloutTitle')}</h2>
    <p>{t('welcome.partnerCalloutText')}</p>
   </div>
   <a className="partner-callout-action" href="https://wa.me/996500097582" target="_blank" rel="noreferrer">
    <Icon name="chat" size={18} /> {t('welcome.partnerCalloutAction')}
   </a>
  </section>

   <section className="section-contact animate-on-scroll">
    <div className="contact-section-shell">
     <div className="contact-section-copy">
      <span className="contact-kicker">{t('welcome.contactKicker')}</span>
      <h2 className="section-title">{t('welcome.contactTitle')}</h2>
      <p className="section-subtitle contact-subtitle">{t('welcome.contactSubtitle')}</p>
     </div>
    <div className="contact-grid">
      {contactItems.map((item) => (
       <a
        key={item.href}
        href={item.href}
        className={`contact-card ${item.className}`}
        target="_blank"
        rel="noreferrer"
       >
        <span className="contact-card-icon" aria-hidden="true"><Icon name={item.icon} size={18} /></span>
        <span className="contact-card-label">{item.label}</span>
        <span className="contact-card-value">{item.value}</span>
       </a>
      ))}
     </div>
    </div>
   </section>

   {/* Footer */}
   <footer className="footer-new">
    <div className="footer-content">
     <div className="footer-brand">
      <div className="footer-logo">
       <img src={logoSrc} alt="TeamUp" className="footer-logo-img" />
       <span>TeamUp</span>
      </div>
      <p>{t('welcome.footerDesc')}</p>
      <div className="footer-sports"><SportIcon name="football" size={18} /><SportIcon name="basketball" size={18} /><SportIcon name="volleyball" size={18} /></div>
     </div>
     
     <div className="footer-links">
      <div className="footer-column">
       <h4>{t('welcome.platform')}</h4>
       <a href="#games">{t('welcome.allGames')}</a>
       <a href="#sports">{t('welcome.venuesLink')}</a>
    <Link to="/leaderboard">{t('nav.leaderboard')}</Link>
    <Link to="/login">{t('welcome.createGameLink')}</Link>
      </div>
      <div className="footer-column">
       <h4>{t('welcome.company')}</h4>
       <a href="https://www.instagram.com/teamup_kg/" target="_blank" rel="noreferrer">{t('welcome.aboutUs')}</a>
       <a href="https://www.instagram.com/teamup_kg/" target="_blank" rel="noreferrer">{t('welcome.blog')}</a>
       <a href="https://www.instagram.com/teamup_kg/" target="_blank" rel="noreferrer">{t('welcome.careers')}</a>
       <a href="https://www.instagram.com/teamup_kg/" target="_blank" rel="noreferrer">{t('welcome.press')}</a>
      </div>
      <div className="footer-column">
       <h4>{t('welcome.support')}</h4>
       <a href="https://wa.me/996500097582" target="_blank" rel="noreferrer">{t('welcome.helpCenter')}</a>
       <a href="mailto:teamup.fip14@gmail.com">{t('welcome.contact')}</a>
       <Link to="/legal/terms">{t('welcome.terms')}</Link>
       <Link to="/legal/privacy">{t('welcome.privacy')}</Link>
      </div>
     </div>
    </div>
    
    <div className="footer-bottom">
     <p>{t('welcome.copyright')}</p>
    </div>
   </footer>
  </div>
 )
}
