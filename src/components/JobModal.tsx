import type { Job } from '../types/job'
import { Card } from './Card'
import { Button } from './Button'
import { SPACING } from '../design-system/tokens/spacing'
import { COLORS } from '../design-system/tokens/colors'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { RADIUS } from '../design-system/tokens/radius'

interface JobModalProps {
    job: Job | null
    isOpen: boolean
    onClose: () => void
}

export function JobModal({ job, isOpen, onClose }: JobModalProps) {
    if (!isOpen || !job) return null

    const handleApply = () => {
        window.open(job.applyUrl, '_blank')
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <Card style={{
                maxWidth: '720px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{
                            fontFamily: TYPOGRAPHY.FontFamily.Serif,
                            fontSize: TYPOGRAPHY.Size.H2,
                            marginBottom: SPACING.xs
                        }}>
                            {job.title}
                        </h2>
                        <div style={{
                            fontSize: TYPOGRAPHY.Size.BodyLarge,
                            color: COLORS.PrimaryText,
                            opacity: 0.8
                        }}>
                            {job.company} • {job.location} ({job.mode})
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: COLORS.PrimaryText
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Details */}
                <div style={{ margin: `${SPACING.lg} 0` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACING.md }}>
                        <div>
                            <strong>Experience:</strong> {job.experience}
                        </div>
                        <div>
                            <strong>Salary:</strong> {job.salaryRange}
                        </div>
                        <div>
                            <strong>Source:</strong> {job.source}
                        </div>
                        <div>
                            <strong>Posted:</strong> {job.postedDaysAgo} days ago
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: SPACING.lg }}>
                    <h3 style={{
                        fontFamily: TYPOGRAPHY.FontFamily.Serif,
                        fontSize: TYPOGRAPHY.Size.H3,
                        marginBottom: SPACING.sm
                    }}>
                        Description
                    </h3>
                    <p style={{ lineHeight: TYPOGRAPHY.LineHeight.Relaxed }}>
                        {job.description}
                    </p>
                </div>

                {/* Skills */}
                <div style={{ marginBottom: SPACING.lg }}>
                    <h3 style={{
                        fontFamily: TYPOGRAPHY.FontFamily.Serif,
                        fontSize: TYPOGRAPHY.Size.H3,
                        marginBottom: SPACING.sm
                    }}>
                        Key Skills
                    </h3>
                    <div style={{ display: 'flex', gap: SPACING.xs, flexWrap: 'wrap' }}>
                        {job.skills.map(skill => (
                            <span key={skill} style={{
                                backgroundColor: `${COLORS.PrimaryText}08`,
                                padding: '4px 12px',
                                borderRadius: RADIUS.Default,
                                fontSize: '14px'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: SPACING.md, marginTop: SPACING.lg }}>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={handleApply}>
                        Apply Now ↗
                    </Button>
                </div>

            </Card>
        </div>
    )
}
