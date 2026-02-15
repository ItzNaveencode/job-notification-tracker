import { ContextHeader } from '../layout/ContextHeader'
import { TwoColumnLayout } from '../layout/TwoColumnLayout'
import { COLORS } from '../design-system/tokens/colors'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { SPACING } from '../design-system/tokens/spacing'
import { RADIUS } from '../design-system/tokens/radius'

export function DashboardPage() {
    return (
        <>
            <ContextHeader
                title="Dashboard"
                description="Your daily job feed overview"
            />

            <TwoColumnLayout
                leftContent={
                    <div style={{
                        fontFamily: TYPOGRAPHY.FontFamily.Base,
                        fontSize: TYPOGRAPHY.Size.Body,
                        color: COLORS.PrimaryText,
                        opacity: 0.6,
                        textAlign: 'center',
                        padding: SPACING.xl,
                        border: `1px dashed ${COLORS.PrimaryText}20`,
                        borderRadius: RADIUS.Default
                    }}>
                        <p>No jobs yet. In the next step, you will load a realistic dataset.</p>
                    </div>
                }
                rightContent={<div />}
            />
        </>
    )
}
