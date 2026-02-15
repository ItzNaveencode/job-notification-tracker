import type { Job } from '../types/job'
import { Card } from './Card'
import { Button } from './Button'
import { COLORS } from '../design-system/tokens/colors'
import { SPACING } from '../design-system/tokens/spacing'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { RADIUS } from '../design-system/tokens/radius'

interface JobCardProps {
    job: Job
    isSaved: boolean
    onSave: (id: string) => void
    onView: (id: string) => void
}

export function JobCard({ job, isSaved, onSave, onView }: JobCardProps) {
    return (
        <Card style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.sm,
            position: 'relative',
            height: '100%',
            justifyContent: 'space-between'
        }}>
            {/* Header */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h3 style={{
                            fontFamily: TYPOGRAPHY.FontFamily.Serif,
                            fontSize: TYPOGRAPHY.Size.H3,
                            color: COLORS.PrimaryText,
                            marginBottom: '4px'
                        }}>
                            {job.title}
                        </h3>
                        <div style={{
                            fontFamily: TYPOGRAPHY.FontFamily.Base,
                            fontSize: '14px',
                            color: COLORS.PrimaryText,
                            opacity: 0.8,
                            fontWeight: 500
                        }}>
                            {job.company}
                        </div>
                    </div>
                    <div style={{
                        fontSize: '12px',
                        backgroundColor: `${COLORS.PrimaryText}08`,
                        padding: '4px 8px',
                        borderRadius: RADIUS.Default,
                        color: COLORS.PrimaryText,
                        whiteSpace: 'nowrap'
                    }}>
                        {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}
                    </div>
                </div>

                {/* Tags */}
                <div style={{
                    display: 'flex',
                    gap: SPACING.xs,
                    marginTop: SPACING.sm,
                    flexWrap: 'wrap',
                    fontSize: '13px',
                    color: COLORS.PrimaryText,
                    opacity: 0.7
                }}>
                    <span>📍 {job.location} ({job.mode})</span>
                    <span>💼 {job.experience}</span>
                    <span>💰 {job.salaryRange}</span>
                </div>
            </div>

            {/* Actions */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: SPACING.md,
                paddingTop: SPACING.sm,
                borderTop: `1px solid ${COLORS.PrimaryText}10`
            }}>
                <div style={{ fontSize: '12px', opacity: 0.5 }}>
                    via {job.source}
                </div>
                <div style={{ display: 'flex', gap: SPACING.sm }}>
                    <Button
                        variant="secondary"
                        onClick={() => onSave(job.id)}
                        style={{
                            backgroundColor: isSaved ? `${COLORS.Accent}10` : 'transparent',
                            color: isSaved ? COLORS.Accent : COLORS.PrimaryText,
                            borderColor: isSaved ? COLORS.Accent : undefined
                        }}
                    >
                        {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button onClick={() => onView(job.id)}>
                        View
                    </Button>
                </div>
            </div>
        </Card>
    )
}
