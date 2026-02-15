import { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { SPACING } from '../design-system/tokens/spacing'
import { COLORS } from '../design-system/tokens/colors'
import { RADIUS } from '../design-system/tokens/radius'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import {
    CHECKLIST_STORAGE_KEY,
    CHECKLIST_ITEMS
} from '../lib/checklist'
import type { ChecklistState } from '../lib/checklist'

interface SubmissionData {
    lovableLink: string
    githubLink: string
    deployedLink: string
}

export function ShipPage() {
    // Phase 1 Logic: Tests Passed
    const [passedCount, setPassedCount] = useState(0)

    // Phase 2 Logic: Submission Details
    const [submission, setSubmission] = useState<SubmissionData>({
        lovableLink: '',
        githubLink: '',
        deployedLink: ''
    })
    const [errors, setErrors] = useState<Partial<SubmissionData>>({})

    // Phase 3 Logic: Shipped State
    const [status, setStatus] = useState<'loading' | 'locked' | 'passed' | 'shipped'>('loading')

    useEffect(() => {
        try {
            // Check Shipped State First
            const isShipped = localStorage.getItem('jobTrackerShipped') === 'true'
            if (isShipped) {
                setStatus('shipped')
                return
            }

            // Check Test Progress
            const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY)
            if (!raw) {
                setStatus('locked')
                return
            }
            const data: ChecklistState = JSON.parse(raw)
            const count = Object.values(data).filter(Boolean).length
            setPassedCount(count)

            if (count < CHECKLIST_ITEMS.length) {
                setStatus('locked')
            } else {
                setStatus('passed')

                // Load Submission Data only if allowed
                const savedSub = localStorage.getItem('jobTrackerFinalSubmission')
                if (savedSub) {
                    setSubmission(JSON.parse(savedSub))
                }
            }
        } catch (e) {
            console.error('Ship Gate Error', e)
            setStatus('locked')
        }
    }, [])

    const validateUrl = (url: string) => {
        try {
            const parsed = new URL(url)
            return parsed.protocol === 'http:' || parsed.protocol === 'https:'
        } catch {
            return false
        }
    }

    const handleChange = (field: keyof SubmissionData, value: string) => {
        const newData = { ...submission, [field]: value }
        setSubmission(newData)
        localStorage.setItem('jobTrackerFinalSubmission', JSON.stringify(newData))

        // Validate on change
        if (value && !validateUrl(value)) {
            setErrors(prev => ({ ...prev, [field]: 'Must be a valid URL (http/https)' }))
        } else {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    const isSubmissionValid = () => {
        return (
            submission.lovableLink && validateUrl(submission.lovableLink) &&
            submission.githubLink && validateUrl(submission.githubLink) &&
            submission.deployedLink && validateUrl(submission.deployedLink)
        )
    }

    const handleCopy = () => {
        const text = `Project Submission:

Lovable Link: ${submission.lovableLink}
GitHub Repo: ${submission.githubLink}
Deployed URL: ${submission.deployedLink}

Tests Passed: 10 / 10`
        navigator.clipboard.writeText(text)
        alert('Submission details copied to clipboard!')
    }

    const handleShip = () => {
        if (!isSubmissionValid()) return
        localStorage.setItem('jobTrackerShipped', 'true')
        setStatus('shipped')
    }

    if (status === 'loading') return null

    // LOCKED STATE (Tests < 10)
    if (status === 'locked') {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.Background,
                padding: SPACING.xl
            }}>
                <div style={{ fontSize: '64px', marginBottom: SPACING.lg }}>🔒</div>
                <h1 style={{ fontFamily: TYPOGRAPHY.FontFamily.Serif, fontSize: '32px', marginBottom: SPACING.md }}>
                    Shipping Locked
                </h1>
                <p style={{ opacity: 0.7, marginBottom: SPACING.xl, fontSize: '18px' }}>
                    Complete all verification steps before proceeding.
                </p>
                <div style={{
                    padding: SPACING.lg,
                    backgroundColor: COLORS.White,
                    borderRadius: RADIUS.Default,
                    border: '1px solid #D9534F30',
                    color: '#D9534F',
                    fontWeight: 600,
                    marginBottom: SPACING.xl
                }}>
                    Tests Passed: {passedCount} / {CHECKLIST_ITEMS.length}
                </div>
                <Button onClick={() => window.location.href = '/jt/07-test'}>
                    Return to Verification
                </Button>
            </div>
        )
    }

    // SHIPPED STATE
    if (status === 'shipped') {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.Background,
                padding: SPACING.xl,
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '64px', marginBottom: SPACING.lg }}>🎉</div>
                <h1 style={{ fontFamily: TYPOGRAPHY.FontFamily.Serif, fontSize: '48px', marginBottom: SPACING.md, color: COLORS.Accent }}>
                    Project 1 Shipped Successfully.
                </h1>
                <p style={{ opacity: 0.7, fontSize: '20px', marginBottom: SPACING.xl }}>
                    Congratulations on completing your first milestone.
                </p>
                <div style={{ display: 'flex', gap: SPACING.md }}>
                    <Button variant="secondary" onClick={() => window.location.href = '/dashboard'}>
                        Return to Dashboard
                    </Button>
                    <Button onClick={() => {
                        localStorage.removeItem('jobTrackerShipped')
                        window.location.reload()
                    }}>
                        Reset Status (Dev)
                    </Button>
                </div>
            </div>
        )
    }

    // READY TO SHIP STATE (Tests = 10, Form inputs)
    const canShip = isSubmissionValid()

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2ECC7105', // Very subtle green tint
            padding: SPACING.xl
        }}>
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: SPACING.xl }}>
                    <div style={{ fontSize: '48px', marginBottom: SPACING.md }}>🚀</div>
                    <h1 style={{ fontFamily: TYPOGRAPHY.FontFamily.Serif, fontSize: '40px', marginBottom: SPACING.sm, color: '#27AE60' }}>
                        Ready to Ship
                    </h1>
                    <p style={{ opacity: 0.7 }}>
                        All systems verified (10/10). Provide final details to launch.
                    </p>
                </div>

                <div style={{
                    backgroundColor: COLORS.White,
                    padding: SPACING.xl,
                    borderRadius: RADIUS.Default,
                    border: `1px solid ${COLORS.PrimaryText}10`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    marginBottom: SPACING.xl
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
                        {/* Lovable Link */}
                        <div>
                            <label style={{ display: 'block', marginBottom: SPACING.xs, fontWeight: 600, fontSize: '14px' }}>
                                Lovable Project Link
                            </label>
                            <input
                                type="url"
                                placeholder="https://lovable.dev/..."
                                value={submission.lovableLink}
                                onChange={(e) => handleChange('lovableLink', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: SPACING.md,
                                    borderRadius: RADIUS.Default,
                                    border: `1px solid ${errors.lovableLink ? '#D9534F' : `${COLORS.PrimaryText}20`}`,
                                    outline: 'none',
                                    fontSize: '16px'
                                }}
                            />
                            {errors.lovableLink && <div style={{ color: '#D9534F', fontSize: '12px', marginTop: '4px' }}>{errors.lovableLink}</div>}
                        </div>

                        {/* GitHub Link */}
                        <div>
                            <label style={{ display: 'block', marginBottom: SPACING.xs, fontWeight: 600, fontSize: '14px' }}>
                                GitHub Repository Link
                            </label>
                            <input
                                type="url"
                                placeholder="https://github.com/..."
                                value={submission.githubLink}
                                onChange={(e) => handleChange('githubLink', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: SPACING.md,
                                    borderRadius: RADIUS.Default,
                                    border: `1px solid ${errors.githubLink ? '#D9534F' : `${COLORS.PrimaryText}20`}`,
                                    outline: 'none',
                                    fontSize: '16px'
                                }}
                            />
                            {errors.githubLink && <div style={{ color: '#D9534F', fontSize: '12px', marginTop: '4px' }}>{errors.githubLink}</div>}
                        </div>

                        {/* Deployed URL */}
                        <div>
                            <label style={{ display: 'block', marginBottom: SPACING.xs, fontWeight: 600, fontSize: '14px' }}>
                                Deployed URL
                            </label>
                            <input
                                type="url"
                                placeholder="https://my-app.vercel.app"
                                value={submission.deployedLink}
                                onChange={(e) => handleChange('deployedLink', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: SPACING.md,
                                    borderRadius: RADIUS.Default,
                                    border: `1px solid ${errors.deployedLink ? '#D9534F' : `${COLORS.PrimaryText}20`}`,
                                    outline: 'none',
                                    fontSize: '16px'
                                }}
                            />
                            {errors.deployedLink && <div style={{ color: '#D9534F', fontSize: '12px', marginTop: '4px' }}>{errors.deployedLink}</div>}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: SPACING.md, marginTop: SPACING.sm }}>
                            <Button variant="secondary" onClick={handleCopy} style={{ flex: 1 }}>
                                Copy Final Submission
                            </Button>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    {!canShip && (
                        <div style={{ color: '#D9534F', marginBottom: SPACING.md, fontWeight: 600 }}>
                            Complete all requirements before shipping.
                        </div>
                    )}
                    <div style={{ display: 'flex', gap: SPACING.md, justifyContent: 'center' }}>
                        <Button variant="secondary" onClick={() => window.location.href = '/dashboard'}>
                            Back to Dashboard
                        </Button>
                        <Button
                            onClick={handleShip}
                            disabled={!canShip}
                            style={{
                                opacity: canShip ? 1 : 0.5,
                                cursor: canShip ? 'pointer' : 'not-allowed',
                                minWidth: '200px'
                            }}
                        >
                            Ship Project 🚀
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
