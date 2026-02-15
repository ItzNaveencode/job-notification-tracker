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
    onDismiss?: (id: string) => void
}

export function JobCard({ job, isSaved, onSave, onView, onDismiss }: JobCardProps) {
    return (
        <Card style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.sm,
            height: '100%',
            justifyContent: 'space-between',
            overflow: 'hidden'
        }}>
            {/* Header and Content */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        {job.matchScore !== undefined && (
                            <div style={{
                                display: 'inline-block',
                                backgroundColor: job.matchScore >= 70 ? '#E6F4EA' : job.matchScore >= 40 ? '#FEF7E0' : '#FCE8E6',
                                color: job.matchScore >= 70 ? '#137333' : job.matchScore >= 40 ? '#B06000' : '#C5221F',
                                padding: '2px 8px',
                                borderRadius: RADIUS.Default,
                                fontSize: '12px',
                                fontWeight: 600,
                                marginBottom: '8px'
                            }}>
                                {job.matchScore}% Match
                            </div>
                        )}
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
                        whiteSpace: 'nowrap',
                        marginLeft: SPACING.xs
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
                borderTop: `1px solid ${COLORS.PrimaryText}10`,
                flexWrap: 'wrap',
                gap: SPACING.sm
            }}>
                <div style={{ fontSize: '12px', opacity: 0.5, marginBottom: SPACING.xs }}>
                    via {job.source}
                </div>
                <div style={{
                    display: 'flex',
                    gap: SPACING.sm,
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end',
                    flex: 1,
                    minWidth: '200px'
                }}>
                    {onDismiss && (
                        <Button
                            variant="secondary"
                            onClick={() => onDismiss(job.id)}
                            style={{ opacity: 0.7 }}
                        >
                            Dismiss
                        </Button>
                    )}
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
