export const DEMO_TOKEN = '__demo__'

let demoSession = null
const demoUser = {
 id: 'demo-player',
 email: 'demo@teamup.local',
 first_name: 'Demo',
 last_name: 'Player',
 nickname: 'TeamUp Demo',
 role: 'player',
 is_admin: false,
}

const demoEvents = [
 {
  id: 'demo-football',
  title: 'Weekend Football',
  sport_id: 'football',
  sport_name: 'Football',
  venue_name: 'Manas Sports Hall',
  venue_city: 'Bishkek',
  venue_address: 'Manas Avenue 12',
  start_at: '2026-10-04T18:00:00+06:00',
  end_at: '2026-10-04T20:00:00+06:00',
  status: 'active',
  event_type: 'game',
  current_players: 6,
  required_players: 10,
  cost_credits_per_player: 20,
  participants: [],
  teams: [{ id: 'demo-football-team-1', team_number: 1 }, { id: 'demo-football-team-2', team_number: 2 }],
  is_featured: true,
 },
 {
  id: 'demo-basketball',
  title: 'Bishkek Basketball Run',
  sport_id: 'basketball',
  sport_name: 'Basketball',
  venue_name: 'Victory Court',
  venue_city: 'Bishkek',
  venue_address: 'Chuy Avenue 88',
  start_at: '2026-10-06T19:30:00+06:00',
  end_at: '2026-10-06T21:00:00+06:00',
  status: 'active',
  event_type: 'game',
  current_players: 8,
  required_players: 10,
  cost_credits_per_player: 15,
  participants: [],
  teams: [{ id: 'demo-basketball-team-1', team_number: 1 }, { id: 'demo-basketball-team-2', team_number: 2 }],
  is_featured: false,
 },
]

export function isDemoToken(token) {
 return token === DEMO_TOKEN
}

export function resetDemoSession() {
 demoSession = null
 return { user: null }
}

export function getDemoUser() {
 return demoSession?.user || demoUser
}

export function getDemoEvents() {
 return demoEvents.map((event) => ({ ...event, participants: [...event.participants] }))
}

export function getDemoSports() {
 return [
  { id: 'football', name: 'Football' },
  { id: 'basketball', name: 'Basketball' },
  { id: 'volleyball', name: 'Volleyball' },
 ]
}

export function getDemoWallet() {
  return { balance: 0, transactions: [] }
}

export function getDemoPlayerStats() {
 return { onboarding_score: 86, onboarding_level_label: 'Rising player', player_rating: 4.8, games_played: 12, balance: 0 }
}

export function getDemoVenueSlots(venueId) {
 if (String(venueId) !== 'demo-venue') return []
 return [
  {
  id: 'demo-slot-1',
  start_at: '2026-10-04T18:00:00+06:00',
  end_at: '2026-10-04T22:00:00+06:00',
  status: 'open',
  },
  {
  id: 'demo-slot-2',
  start_at: '2026-10-06T18:00:00+06:00',
  end_at: '2026-10-06T22:00:00+06:00',
  status: 'open',
  },
 ]
}

export function getDemoVenues() {
 return [{
  id: 'demo-venue',
  name: 'Manas Sports Hall',
  city: 'Bishkek',
  address: 'Manas Avenue 12',
  sport_ids: ['football', 'basketball', 'volleyball'],
  sports: ['Football', 'Basketball', 'Volleyball'],
 }]
}

export function createDemoEvent(payload = {}) {
 const eventId = `demo-created-${Date.now()}`
 const event = {
  id: eventId,
  title: payload.title || 'Demo game',
  sport_id: payload.sport_id,
  sport_name: payload.sport_name || payload.sport_id || 'Sport',
  venue_id: payload.venue_id,
  venue_name: payload.venue_name || 'Manas Sports Hall',
  venue_city: payload.venue_city || 'Bishkek',
  created_by_user_id: demoUser.id,
  start_at: payload.start_at,
  end_at: payload.end_at,
  status: 'active',
  event_type: 'game',
  current_players: payload.auto_join_creator ? 1 : 0,
  required_players: Number(payload.required_players) || 10,
  cost_credits_per_player: 0,
  participants: payload.auto_join_creator ? [{ user_id: demoUser.id, first_name: demoUser.first_name, last_name: demoUser.last_name, status: 'joined' }] : [],
  teams: Array.from({ length: Number(payload.teams_count) || 2 }, (_, index) => ({
   id: `${eventId}-team-${index + 1}`,
   team_number: index + 1,
  })),
 }
 demoEvents.unshift(event)
  return {
  ...event,
  }
}

export function getDemoEvent(eventId) {
 const events = getDemoEvents()
 const event = events.find((item) => String(item.id) === String(eventId))
 if (!event) throw new Error('Demo game not found')
 return event
}

export function joinDemoEvent(eventId) {
 const event = demoEvents.find((item) => item.id === eventId) || demoEvents[0]
 if (!event.participants.some((participant) => participant.user_id === demoUser.id)) {
  event.participants.push({ user_id: demoUser.id, first_name: demoUser.first_name, last_name: demoUser.last_name, status: 'joined' })
  event.current_players += 1
 }
 return event
}

export function leaveDemoEvent(eventId) {
 const event = demoEvents.find((item) => item.id === eventId) || demoEvents[0]
 event.participants = event.participants.filter((participant) => participant.user_id !== demoUser.id)
 event.current_players = Math.max(0, event.current_players - 1)
 return event
}

export function getDemoProfileGames() {
 return {
  created_games: demoEvents.filter((event) => event.created_by_user_id === demoUser.id),
  completed_games: [],
  cancelled_games: [],
 }
}

export function updateDemoProfile(form = {}) {
  return form
}

export function getDemoLeaderboard() {
 return [
  { id: 'demo-morning', first_name: 'Aibek', last_name: 'Sadykov', games_played: 28, player_rating: 5.0 },
  { id: 'demo-strong', first_name: 'Alina', last_name: 'Kadyrova', games_played: 24, player_rating: 4.9 },
  { id: demoUser.id, first_name: demoUser.first_name, last_name: demoUser.last_name, games_played: 21, player_rating: 4.8 },
  { id: 'demo-focused', first_name: 'Timur', last_name: 'Bekov', games_played: 19, player_rating: 4.7 },
  { id: 'demo-weekend', first_name: 'Nursultan', last_name: 'Asanov', games_played: 16, player_rating: 4.6 },
  { id: 'demo-mindful', first_name: 'Mira', last_name: 'Akhmetova', games_played: 14, player_rating: 4.5 },
 ]
}
