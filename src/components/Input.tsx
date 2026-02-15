import { COLORS } from '../design-system/tokens/colors'
import { SPACING } from '../design-system/tokens/spacing'
import { RADIUS } from '../design-system/tokens/radius'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { MOTION } from '../design-system/tokens/motion'
import type { ComponentProps } from 'react'

export function Input(props: ComponentProps<'input'>) {
    return (
        <input
            {...props}
            style={{
                width: '100%',
                padding: `${SPACING.sm}`,
                borderRadius: RADIUS.Default,
                border: `1px solid ${COLORS.PrimaryText}20`,
                backgroundColor: 'transparent',
                color: COLORS.PrimaryText,
                fontFamily: TYPOGRAPHY.FontFamily.Base,
                fontSize: TYPOGRAPHY.Size.Body,
                transition: `all ${MOTION.Duration.Fast} ${MOTION.Timing.Default}`,
                outline: 'none',
                ...(props.style as any)
            }}
            onFocus={(e) => {
                e.currentTarget.style.borderColor = COLORS.Accent
                e.currentTarget.style.boxShadow = `0 0 0 2px ${COLORS.Accent}10`
            }}
            onBlur={(e) => {
                e.currentTarget.style.borderColor = `${COLORS.PrimaryText}20`
                e.currentTarget.style.boxShadow = 'none'
            }}
        />
    )
}
