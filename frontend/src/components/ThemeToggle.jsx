import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import Icon from './Icon';

export default function ThemeToggle() {
 const { theme, toggleTheme } = useTheme();
 const { t } = useTranslation();
 const nextTheme = theme === 'dark' ? 'light' : 'dark';

 return (
  <button
   type="button"
   className="theme-toggle"
   onClick={toggleTheme}
   aria-label={t(`theme.switchTo${nextTheme === 'dark' ? 'Dark' : 'Light'}`)}
   title={t(`theme.switchTo${nextTheme === 'dark' ? 'Dark' : 'Light'}`)}
  >
   <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
  </button>
 );
}