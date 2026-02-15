import { COLORS } from '../design-system/tokens/colors'
import { SPACING } from '../design-system/tokens/spacing'
import { RADIUS } from '../design-system/tokens/radius'

import { MOTION } from '../design-system/tokens/motion'

export function Card({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) {
    return (
        <div style={{
            maxWidth: '100%',
            backgroundColor: '#FFFFFF', // Use background color or subtle variant?
            border: `1px solid ${COLORS.PrimaryText}10`,
            borderRadius: RADIUS.Default,
            padding: SPACING.md,
            transition: `all ${MOTION.Duration.Fast} ${MOTION.Timing.Default}`,
            boxShadow: 'none',
            ...style,
        }}>
            {children}
        </div>
    )
}
