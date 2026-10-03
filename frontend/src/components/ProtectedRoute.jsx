import { Navigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isDemoToken } from '../demo/demoData'
import { hasCompletedOnboarding, requiresOnboarding } from '../utils/onboarding'

export default function ProtectedRoute({ token, user, allowedRoles, effectiveRole, children }) {
 const { t } = useTranslation()
 const location = useLocation()
 if (!token) return <Navigate to="/login" replace />
 if (!user) return <div className="container">{t('common.loading')}</div>
 if (location.pathname !== '/onboarding' && !isDemoToken(token) && requiresOnboarding(user) && !hasCompletedOnboarding(user)) {
  return <Navigate to="/onboarding" replace />
 }
 if (allowedRoles && !allowedRoles.includes(effectiveRole || user.role)) return <Navigate to="/" replace />
 return children
}
