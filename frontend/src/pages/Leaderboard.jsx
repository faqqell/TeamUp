import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getLeaderboard } from '../api/users'
import UserAvatar from '../components/UserAvatar'
import { getDemoLeaderboard, isDemoToken } from '../demo/demoData'
import { getUserDisplayName } from '../utils/userDisplay'

export default function Leaderboard({ token, user }) {
 const [players, setPlayers] = useState([])
 const [loading, setLoading] = useState(true)
 const [visibleCount, setVisibleCount] = useState(10)
 const { t } = useTranslation()

 useEffect(() => {
  if (isDemoToken(token)) {
   setPlayers(getDemoLeaderboard())
   setLoading(false)
   return
  }
  getLeaderboard(token)
   .then(setPlayers)
   .catch(() => {})
   .finally(() => setLoading(false))
 }, [token])

 const formatRating = (value) => {
  if (value === null || value === undefined) return '-'
  return Number(value).toFixed(1)
 }

 const getDisplayName = (player) => getUserDisplayName(player, '')
 const visiblePlayers = players.slice(0, visibleCount)
 const hasMorePlayers = visibleCount < players.length

 return (
  <div className="dashboard-page leaderboard-page">
   <div className="page-header">
    <div className="page-header-copy">
     <h1>{t('leaderboard.title')}</h1>
     <p className="page-subtitle">{t('leaderboard.subtitle')}</p>
    </div>
   </div>

   {loading ? (
    <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.6 }}>{t('leaderboard.loading')}</div>
   ) : players.length === 0 ? (
    <div className="empty-state glass-card">
     <div className="empty-state-icon">🏆</div>
     <h3>{t('leaderboard.noPlayers')}</h3>
     <p>{t('leaderboard.joinHint')}</p>
    </div>
   ) : (
    <>
    <section className="leaderboard-list" aria-label={t('leaderboard.title')}>
     {visiblePlayers.map((player, index) => {
      const rank = index + 1
      const isCurrentUser = Boolean(user?.id && player.id === user.id)
      return (
       <article key={player.id} className={`leaderboard-entry${isCurrentUser ? ' is-current-user' : ''}`}>
        <div className="leaderboard-entry-rank">#{rank}</div>
        <UserAvatar
      src={player.photo_url}
      name={getDisplayName(player)}
      alt={getDisplayName(player)}
      className="user-avatar-small leaderboard-entry-avatar"
      size={48}
        />
        <div className="leaderboard-entry-copy">
      <strong>{getDisplayName(player)}</strong>
      <span>{player.games_played} {t('leaderboard.games')}</span>
        </div>
        <div className="leaderboard-entry-score">
      <strong>{formatRating(player.player_rating)}</strong>
      <span>{t('dashboard.rating')}</span>
        </div>
       </article>
      )
     })}
      {hasMorePlayers ? (
       <div className="leaderboard-more">
        <button
         type="button"
         className="btn-secondary glass-btn leaderboard-more-btn"
         onClick={() => setVisibleCount((current) => current + 10)}
        >
         {t('leaderboard.showMore')}
        </button>
       </div>
      ) : null}
     </section>
    </>
   )}
  </div>
 )
}
