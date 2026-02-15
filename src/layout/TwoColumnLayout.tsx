import { SPACING } from '../design-system/tokens/spacing'

interface TwoColumnLayoutProps {
    leftContent?: React.ReactNode
    rightContent?: React.ReactNode
}

export function TwoColumnLayout({ leftContent, rightContent }: TwoColumnLayoutProps) {
    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: SPACING.md,
            paddingRight: SPACING.md,
            display: 'flex',
            gap: SPACING.lg,
        }}>
            {/* Left Column - 70% */}
            <div style={{
                flex: '0 0 70%',
                maxWidth: '70%'
            }}>
                {leftContent}
            </div>

            {/* Right Column - 30% */}
            <div style={{
                flex: '0 0 30%',
                maxWidth: '30%'
            }}>
                {rightContent}
            </div>
        </div>
    )
}
