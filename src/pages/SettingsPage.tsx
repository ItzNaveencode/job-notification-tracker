import { ContextHeader } from '../layout/ContextHeader'
import { TwoColumnLayout } from '../layout/TwoColumnLayout'
import { Card } from '../components/Card'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { COLORS } from '../design-system/tokens/colors'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { SPACING } from '../design-system/tokens/spacing'

export function SettingsPage() {
    return (
        <>
            <ContextHeader
                title="Settings"
                description="Configure your job matching preferences"
            />

            <TwoColumnLayout
                leftContent={
                    <Card>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.md }}>
                            {/* Role keywords */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: SPACING.xs,
                                    fontFamily: TYPOGRAPHY.FontFamily.Base,
                                    fontSize: TYPOGRAPHY.Size.Body,
                                    color: COLORS.PrimaryText,
                                    fontWeight: 600
                                }}>
                                    Role keywords
                                </label>
                                <Input placeholder="e.g. Frontend Engineer, React Developer" />
                            </div>

                            {/* Preferred Locations */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: SPACING.xs,
                                    fontFamily: TYPOGRAPHY.FontFamily.Base,
                                    fontSize: TYPOGRAPHY.Size.Body,
                                    color: COLORS.PrimaryText,
                                    fontWeight: 600
                                }}>
                                    Preferred Locations
                                </label>
                                <Input placeholder="e.g. Bangalore, Remote, Pune" />
                            </div>

                            {/* Mode */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: SPACING.xs,
                                    fontFamily: TYPOGRAPHY.FontFamily.Base,
                                    fontSize: TYPOGRAPHY.Size.Body,
                                    color: COLORS.PrimaryText,
                                    fontWeight: 600
                                }}>
                                    Mode
                                </label>
                                <Input placeholder="Remote, Hybrid, or Onsite" />
                            </div>

                            {/* Experience Level */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: SPACING.xs,
                                    fontFamily: TYPOGRAPHY.FontFamily.Base,
                                    fontSize: TYPOGRAPHY.Size.Body,
                                    color: COLORS.PrimaryText,
                                    fontWeight: 600
                                }}>
                                    Experience Level
                                </label>
                                <Input placeholder="e.g. 0-2 years, Junior" />
                            </div>

                            <div style={{ marginTop: SPACING.sm }}>
                                <Button>Save Preferences</Button>
                            </div>
                        </div>
                    </Card>
                }
                rightContent={
                    <div style={{
                        fontFamily: TYPOGRAPHY.FontFamily.Base,
                        fontSize: TYPOGRAPHY.Size.Body,
                        color: COLORS.PrimaryText,
                        opacity: 0.7,
                        lineHeight: TYPOGRAPHY.LineHeight.Relaxed
                    }}>
                        <h3 style={{
                            fontFamily: TYPOGRAPHY.FontFamily.Serif,
                            fontSize: TYPOGRAPHY.Size.H3,
                            marginBottom: SPACING.sm,
                            color: COLORS.PrimaryText,
                            opacity: 1
                        }}>
                            How matching works
                        </h3>
                        <p>
                            We analyze thousands of job listings daily. Your preferences help us filter the noise and deliver only the opportunities that align with your career goals.
                        </p>
                    </div>
                }
            />
        </>
    )
}
