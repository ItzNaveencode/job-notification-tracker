import { COLORS } from '../design-system/tokens/colors'
import { SPACING } from '../design-system/tokens/spacing'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { RADIUS } from '../design-system/tokens/radius'

export function TopBar() {
    return (
        <div
            style={{
                height: SPACING.xl,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `0 ${SPACING.md}`,
                borderBottom: `1px solid ${COLORS.PrimaryText}20`,
                backgroundColor: COLORS.Background,
                fontFamily: TYPOGRAPHY.FontFamily.Base,
                fontSize: TYPOGRAPHY.Size.Body,
                color: COLORS.PrimaryText,
            }}
        >
            {/* Left: Project Name */}
            <div style={{ fontWeight: 600 }}>
                Job Notification Tracker
            </div>

            {/* Center: Step Counter */}
            <div style={{ opacity: 0.6 }}>
                Step 1 / 9
            </div>

            {/* Right: Status Badge */}
            <div
                style={{
                    padding: `${SPACING.xs} ${SPACING.sm}`,
                    borderRadius: RADIUS.Default,
                    backgroundColor: `${COLORS.PrimaryText}10`,
                    fontSize: TYPOGRAPHY.Size.Caption,
                    fontWeight: 500,
                }}
            >
                Not Started
            </div>
        </div>
    )
}