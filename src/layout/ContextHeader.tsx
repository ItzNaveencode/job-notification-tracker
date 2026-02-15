import { COLORS } from '../design-system/tokens/colors'
import { SPACING } from '../design-system/tokens/spacing'
import { TYPOGRAPHY } from '../design-system/tokens/typography'

interface ContextHeaderProps {
    title: string
    description: string
}

export function ContextHeader({ title, description }: ContextHeaderProps) {
    return (
        <header style={{
            maxWidth: TYPOGRAPHY.Layout.MaxTextWidth,
            margin: '0 auto',
            marginBottom: SPACING.xl,
            paddingLeft: SPACING.md,
            paddingRight: SPACING.md,
        }}>
            <h1 style={{
                fontFamily: TYPOGRAPHY.FontFamily.Serif,
                fontSize: TYPOGRAPHY.Size.H1,
                color: COLORS.PrimaryText,
                lineHeight: TYPOGRAPHY.LineHeight.Tight,
                marginBottom: SPACING.xs,
            }}>
                {title}
            </h1>
            <p style={{
                fontFamily: TYPOGRAPHY.FontFamily.Base,
                fontSize: TYPOGRAPHY.Size.BodyLarge,
                color: COLORS.PrimaryText,
                opacity: 0.6,
                lineHeight: TYPOGRAPHY.LineHeight.Relaxed,
            }}>
                {description}
            </p>
        </header>
    )
}
