import { COLORS } from '../design-system/tokens/colors'
import { SPACING } from '../design-system/tokens/spacing'
import { RADIUS } from '../design-system/tokens/radius'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { MOTION } from '../design-system/tokens/motion'
import type { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
    variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', style, ...props }: ButtonProps) {
    const isPrimary = variant === 'primary'

    return (
        <button
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: `${SPACING.xs} ${SPACING.md}`,
                borderRadius: RADIUS.Default,
                border: isPrimary ? 'none' : `1px solid ${COLORS.PrimaryText}40`,
                backgroundColor: isPrimary ? COLORS.Accent : 'transparent',
                color: isPrimary ? COLORS.Background : COLORS.PrimaryText,
                fontWeight: 600,
                fontFamily: TYPOGRAPHY.FontFamily.Base,
                fontSize: TYPOGRAPHY.Size.Body,
                cursor: 'pointer',
                transition: `all ${MOTION.Duration.Fast} ${MOTION.Timing.Default}`,
                outline: 'none',
                ...style,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.opacity = '0.9'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.opacity = '1'
            }}
            {...props}
        />
    )
}
