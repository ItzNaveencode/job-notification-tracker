import { ContextHeader } from '../layout/ContextHeader'
import { TwoColumnLayout } from '../layout/TwoColumnLayout'
import { COLORS } from '../design-system/tokens/colors'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { SPACING } from '../design-system/tokens/spacing'
import { RADIUS } from '../design-system/tokens/radius'

export function DigestPage() {
    return (
        <>
            <ContextHeader
                title="Weekly Digest"
                description="A summary of your weekly activity and insights"
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
                        <p>Your digest will appear here once you have some activity.</p>
                    </div>
                }
                rightContent={<div />}
            />
        </>
    )
}
