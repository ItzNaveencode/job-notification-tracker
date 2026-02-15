import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { COLORS } from '../design-system/tokens/colors'
import { SPACING } from '../design-system/tokens/spacing'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { MOTION } from '../design-system/tokens/motion'

const NAV_ITEMS = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Saved', path: '/saved' },
    { label: 'Digest', path: '/digest' },
    { label: 'Settings', path: '/settings' },
    { label: 'Proof', path: '/proof' },
]

export function TopBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <nav style={{
            position: 'relative',
            zIndex: 100,
            backgroundColor: COLORS.Background,
            borderBottom: `1px solid ${COLORS.PrimaryText}20`,
        }}>
            <div style={{
                height: SPACING.xl,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `0 ${SPACING.md}`,
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                {/* Left: Project Name */}
                <NavLink to="/" style={{
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: COLORS.PrimaryText,
                    fontFamily: TYPOGRAPHY.FontFamily.Base,
                    fontSize: TYPOGRAPHY.Size.Body,
                }}>
                    Job Notification Tracker
                </NavLink>

                {/* Desktop Navigation */}
                <div className="desktop-nav" style={{
                    display: 'flex',
                    gap: SPACING.lg,
                    height: '100%',
                }}>
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                                textDecoration: 'none',
                                color: COLORS.PrimaryText,
                                fontFamily: TYPOGRAPHY.FontFamily.Base,
                                fontSize: TYPOGRAPHY.Size.Body,
                                borderBottom: isActive ? `2px solid ${COLORS.Accent}` : '2px solid transparent',
                                transition: `all ${MOTION.Duration.Fast} ${MOTION.Timing.Default}`,
                                fontWeight: isActive ? 500 : 400,
                                opacity: isActive ? 1 : 0.7,
                            })}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="mobile-menu-btn"
                    style={{
                        display: 'none', // Hidden by default, shown via media query in CSS later effectively or logic
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: SPACING.xs,
                    }}
                >
                    <div style={{ width: '24px', height: '2px', background: COLORS.PrimaryText, marginBottom: '6px' }}></div>
                    <div style={{ width: '24px', height: '2px', background: COLORS.PrimaryText, marginBottom: '6px' }}></div>
                    <div style={{ width: '24px', height: '2px', background: COLORS.PrimaryText }}></div>
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: SPACING.xl,
                    left: 0,
                    right: 0,
                    backgroundColor: COLORS.Background,
                    borderBottom: `1px solid ${COLORS.PrimaryText}20`,
                    padding: SPACING.md,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: SPACING.md,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}>
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? COLORS.Accent : COLORS.PrimaryText,
                                fontFamily: TYPOGRAPHY.FontFamily.Base,
                                fontSize: TYPOGRAPHY.Size.BodyLarge,
                                fontWeight: isActive ? 600 : 400,
                                padding: `${SPACING.xs} 0`,
                            })}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            )}

            {/* Simple style tag for responsive hiding since we aren't using CSS modules yet */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
        </nav>
    )
}