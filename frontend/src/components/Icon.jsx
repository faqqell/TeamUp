const ICON_PATHS = {
  home: ['M4 10.6 12 4l8 6.6', 'M6.2 9.6V20h11.6V9.6', 'M10 20v-5.4h4V20'],
  calendar: ['M4.5 6.4h15v13.1h-15z', 'M4.5 10.3h15', 'M8.4 4.5v3.4', 'M15.6 4.5v3.4'],
  clock: ['M12 3.6a8.4 8.4 0 1 1 0 16.8 8.4 8.4 0 0 1 0-16.8z', 'M12 7.6V12l3.1 1.9'],
  plus: ['M12 5.5v13', 'M5.5 12h13'],
  'plus-circle': ['M12 3.6a8.4 8.4 0 1 1 0 16.8 8.4 8.4 0 0 1 0-16.8z', 'M12 8.4v7.2', 'M8.4 12h7.2'],
  trophy: ['M8 4.5h8v5.1a4 4 0 0 1-8 0z', 'M8 6.2H5.4v1.7a2.8 2.8 0 0 0 2.8 2.8', 'M16 6.2h2.6v1.7a2.8 2.8 0 0 1-2.8 2.8', 'M12 13.6V17', 'M8.6 19.5h6.8'],
  wallet: ['M4 7.4h13.2a2.3 2.3 0 0 1 2.3 2.3v7a2.3 2.3 0 0 1-2.3 2.3H4z', 'M4 7.4 15.2 5a1.6 1.6 0 0 1 2 1.2', 'M16.4 13.3h1.9'],
  user: ['M12 4.6a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2z', 'M5.4 20a6.6 6.6 0 0 1 13.2 0'],
  users: ['M9.4 4.8a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8z', 'M3.4 19.4a6 6 0 0 1 12 0', 'M16 5.4a3 3 0 0 1 0 5.9', 'M17.2 14.2a5.4 5.4 0 0 1 3.4 5'],
  chart: ['M4.5 19.4h15', 'M7.8 19.4v-6.1', 'M12 19.4V7.6', 'M16.2 19.4v-8.6'],
  building: ['M5 19.6V5.2a1 1 0 0 1 1-1h7.2a1 1 0 0 1 1 1v14.4', 'M14.2 10.4h3.8a1 1 0 0 1 1 1v8.2', 'M3.4 19.6h17.2', 'M9.9 20v-3.4h3.1V20'],
  logout: ['M14.6 5.4H5.9a1.4 1.4 0 0 0-1.4 1.4v10.4a1.4 1.4 0 0 0 1.4 1.4h8.7', 'M15.2 12H9.4', 'M13 9.2 15.8 12l-2.8 2.8', 'M17.4 8.6v6.8'],
  bell: ['M6.6 10.4a5.4 5.4 0 0 1 10.8 0c0 3.2.9 4.6 1.4 5.2H5.2c.5-.6 1.4-2 1.4-5.2z', 'M10.2 18.4a2 2 0 0 0 3.6 0'],
  close: ['M6.4 6.4l11.2 11.2', 'M17.6 6.4 6.4 17.6'],
  menu: ['M4 6.5h16', 'M4 12h16', 'M4 17.5h16'],
  search: ['M10.8 4.6a6.2 6.2 0 1 1 0 12.4 6.2 6.2 0 0 1 0-12.4z', 'M15.4 15.4 20 20'],
  'map-pin': ['M12 21c3.6-4.3 5.4-7.3 5.4-9.6A5.4 5.4 0 0 0 6.6 11.4c0 2.3 1.8 5.3 5.4 9.6z', 'M12 11.6a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6z'],
  flag: ['M6.4 20.4V4.6', 'M6.4 5.4h9.9l-1.6 3.4 1.6 3.4H6.4'],
  coins: ['M9.2 8.4a5.1 3.6 0 1 1 0 7.2 5.1 3.6 0 0 1 0-7.2z', 'M14.8 8.4a5.1 3.6 0 1 1 0 7.2 5.1 3.6 0 0 1 0-7.2z'],
  star: ['M12 4.4l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 10.1l5.4-.8z'],
  check: ['M5.4 12.6 9.8 17l8.8-10'],
  edit: ['M4.6 19.4h3.6L19 8.6a2.1 2.1 0 0 0-3-3L4.6 17v2.4z', 'M14.8 5.4l3.2 3.2'],
  trash: ['M4.8 7.4h14.4', 'M9.4 7.4V5.2h5.2v2.2', 'M6.6 7.4l.9 11.4a1.4 1.4 0 0 0 1.4 1.3h6.2a1.4 1.4 0 0 0 1.4-1.3l.9-11.4'],
  mail: ['M3.8 6.4h16.4v11.2H3.8z', 'M4.6 7.2 12 13l7.4-5.8'],
  chat: ['M12 4.6c4.2 0 7.4 2.9 7.4 6.6S16.2 17.8 12 17.8a8.7 8.7 0 0 1-2.3-.3L5.4 19.4l1-3.2a6.4 6.4 0 0 1-1.8-4.7C4.6 7.5 7.8 4.6 12 4.6z'],
  instagram: ['M8 4.6h8a3.4 3.4 0 0 1 3.4 3.4v8a3.4 3.4 0 0 1-3.4 3.4H8A3.4 3.4 0 0 1 4.6 16V8A3.4 3.4 0 0 1 8 4.6z', 'M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z', 'M16.8 7.6h.01'],
  megaphone: ['M4.6 10.6v2.8l11.4 4.6V6z', 'M16 9.6h2a2.4 2.4 0 0 1 0 4.8h-2', 'M7.4 13.4v3.4a1.6 1.6 0 0 0 3.2 0v-2.2'],
  sparkles: ['M11 4.6l1.5 3.9 3.9 1.5-3.9 1.5L11 15.4 9.5 11.5 5.6 10l3.9-1.5z', 'M17.4 14.6l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z'],
  'arrow-left': ['M19 12H5', 'M11 6l-6 6 6 6'],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  'chevron-left': ['M14.4 6.6 9 12l5.4 5.4'],
  'chevron-right': ['M9.6 6.6 15 12l-5.4 5.4'],
  refund: ['M4.6 11.4a7.4 7.4 0 1 1 2.2 5.2', 'M4.6 6.6v4.8h4.8'],
  'minus-circle': ['M12 3.6a8.4 8.4 0 1 1 0 16.8 8.4 8.4 0 0 1 0-16.8z', 'M8.4 12h7.2'],
  ban: ['M12 3.6a8.4 8.4 0 1 1 0 16.8 8.4 8.4 0 0 1 0-16.8z', 'M6.4 6.4l11.2 11.2'],
  shield: ['M12 4.2 19 7v5.4c0 3.6-2.9 6.4-7 7.4-4.1-1-7-3.8-7-7.4V7z', 'M9.2 12.2l2 2 3.6-4'],
  list: ['M8.4 7.4h11.2', 'M8.4 12h11.2', 'M8.4 16.6h11.2', 'M4.4 7.4h.01', 'M4.4 12h.01', 'M4.4 16.6h.01'],
  grid: ['M4.8 4.8h5.6v5.6H4.8z', 'M13.6 4.8h5.6v5.6h-5.6z', 'M4.8 13.6h5.6v5.6H4.8z', 'M13.6 13.6h5.6v5.6h-5.6z'],
  filter: ['M4.6 6.4h14.8', 'M7.6 12h8.8', 'M10.6 17.6h2.8'],
  'credit-card': ['M3.8 6.4h16.4v11.2H3.8z', 'M3.8 10.2h16.4', 'M7 14.2h3.2'],
  receipt: ['M6.4 3.8h11.2v16.4l-2.4-1.5-2.2 1.5-2.2-1.5-2.2 1.5-2.2-1.5z', 'M9.4 8.4h5.2', 'M9.4 12.2h5.2'],
  refresh: ['M19.4 12a7.4 7.4 0 1 1-2.2-5.2', 'M19.4 6.6v4.8h-4.8'],
  sun: ['M12 4.2v1.4', 'M12 18.4v1.4', 'M4.2 12h1.4', 'M18.4 12h1.4', 'M6.5 6.5l1 1', 'M16.5 16.5l1 1', 'M17.5 6.5l-1 1', 'M7.5 16.5l-1 1', 'M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z'],
  moon: ['M19.4 14.7A7.5 7.5 0 0 1 9.3 4.6a7.5 7.5 0 1 0 10.1 10.1z'],
};

const SPORT_ICONS = {
  football: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.4l3.4 2.5-1.3 4H9.9L8.6 9.9z" />
      <path d="M12 3.6v3.8M19.9 9.9l-4.5 0M16.4 18.6l-2.3-4.7M7.6 18.6l2.3-4.7M4.1 9.9l4.5 0" />
    </>
  ),
  basketball: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.6 12h16.8" />
      <path d="M5.7 5.7c3.5 3.5 3.5 9.1 0 12.6" />
      <path d="M18.3 5.7c-3.5 3.5-3.5 9.1 0 12.6" />
    </>
  ),
  volleyball: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 3.6c3 3.7 4.3 8 3.6 12.4" />
      <path d="M20.1 10.4c-4.1-1.7-8.6-1.5-12.4.6" />
      <path d="M5.4 5.9c2.4 3.9 6 6.5 10.4 7.6" />
    </>
  ),
  tennis: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M6.1 6.1c2.6 1.1 4.2 3.1 4.6 6" />
      <path d="M17.9 17.9c-2.6-1.1-4.2-3.1-4.6-6" />
    </>
  ),
  padel: (
    <>
      <path d="M9.4 3.9h5.2a4.6 4.6 0 0 1 4.6 4.6v2.1a4.6 4.6 0 0 1-4.6 4.6H9.4a4.6 4.6 0 0 1-4.6-4.6V8.5a4.6 4.6 0 0 1 4.6-4.6z" />
      <path d="M9.8 7.4h4.4M9.8 10.4h4.4M12 7.4v3" />
      <path d="M12 15.2v4.9" />
    </>
  ),
  ball: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 3.6c2.2 2.6 3.2 5.6 3.2 8.4s-1 5.8-3.2 8.4" />
      <path d="M12 3.6c-2.2 2.6-3.2 5.6-3.2 8.4s1 5.8 3.2 8.4" />
    </>
  ),
};

export function getSportIconName(sportName) {
  const normalized = String(sportName || '').toLowerCase();
  if (!normalized) return 'ball';
  if (normalized.includes('football') || normalized.includes('soccer') || normalized.includes('футбол')) {
    return 'football';
  }
  if (normalized.includes('basketball') || normalized.includes('баскетбол')) return 'basketball';
  if (normalized.includes('volleyball') || normalized.includes('волейбол')) return 'volleyball';
  if (normalized.includes('tennis') || normalized.includes('теннис')) return 'tennis';
  if (normalized.includes('padel') || normalized.includes('падел')) return 'padel';
  return 'ball';
}

export function SportIcon({ name, size = 18, strokeWidth = 1.6, className = '' }) {
  return (
    <svg
      className={`icon icon-sport ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {SPORT_ICONS[getSportIconName(name)] || SPORT_ICONS.ball}
    </svg>
  );
}

export default function Icon({ name, size = 20, strokeWidth = 1.6, className = '', title }) {
  const paths = ICON_PATHS[name] || ICON_PATHS.grid;
  return (
    <svg
      className={`icon icon-${name} ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {paths.map((d, index) => (
        <path key={`${name}-${index}`} d={d} />
      ))}
    </svg>
  );
}
