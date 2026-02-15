import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { COLORS } from '../design-system/tokens/colors'
import { SPACING } from '../design-system/tokens/spacing'

export function LandingPage() {
    return (
        <div style={{
            maxWidth: TYPOGRAPHY.Layout.MaxTextWidth,
            margin: '0 auto',
            padding: `${SPACING.xl} ${SPACING.md}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: SPACING.md,
        }}>
            <h1 style={{
                fontFamily: TYPOGRAPHY.FontFamily.Serif,
                fontSize: TYPOGRAPHY.Size.H1,
                color: COLORS.PrimaryText,
                lineHeight: TYPOGRAPHY.LineHeight.Tight,
            }}>
                Stop Missing The Right Jobs.
            </h1>

            <p style={{
                fontFamily: TYPOGRAPHY.FontFamily.Base,
                fontSize: TYPOGRAPHY.Size.BodyLarge,
                color: COLORS.PrimaryText,
                opacity: 0.7,
                lineHeight: TYPOGRAPHY.LineHeight.Relaxed,
                marginBottom: SPACING.lg,
            }}>
                Precision-matched job discovery delivered daily at 9AM.
            </p>

            <div>
                <Link to="/settings" style={{ textDecoration: 'none' }}>
                    <Button>Start Tracking</Button>
                </Link>
            </div>
        </div>
    )
}
