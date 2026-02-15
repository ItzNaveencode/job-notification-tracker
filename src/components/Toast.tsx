import { useEffect } from 'react'
import { COLORS } from '../design-system/tokens/colors'
import { SPACING } from '../design-system/tokens/spacing'
import { RADIUS } from '../design-system/tokens/radius'
import { TYPOGRAPHY } from '../design-system/tokens/typography'

interface ToastProps {
    message: string
    onClose: () => void
}

export function Toast({ message, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div style={{
            position: 'fixed',
            bottom: SPACING.lg,
            right: SPACING.lg,
            backgroundColor: COLORS.PrimaryText,
            color: COLORS.White,
            padding: `${SPACING.sm} ${SPACING.lg}`,
            borderRadius: RADIUS.Default,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-out',
            fontFamily: TYPOGRAPHY.FontFamily.Base,
            fontSize: '14px',
            fontWeight: 500
        }}>
            {message}
        </div>
    )
}
