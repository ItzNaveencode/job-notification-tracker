import { useState, useEffect, useMemo } from 'react'
import { ContextHeader } from '../layout/ContextHeader'
import { JobCard } from '../components/JobCard'
import { JobModal } from '../components/JobModal'
import { Button } from '../components/Button'
import type { Job } from '../types/job'
import { SPACING } from '../design-system/tokens/spacing'
import { COLORS } from '../design-system/tokens/colors'
import { RADIUS } from '../design-system/tokens/radius'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { JOBS } from '../data/jobs'
import type { JobPreferences } from '../types/preferences'
import { DEFAULT_PREFERENCES } from '../types/preferences'
import {
    generateDigest,
    getTodayKey,
    loadDigest,
    saveDigest,
    formatDigestForClipboard,
    formatDigestForEmail
} from '../lib/digest'
import { getStatusHistory, getStatusColor } from '../lib/status'
import type { JobStatus } from '../lib/status'

function RecentActivity() {
    const [history, setHistory] = useState<{ job: Job, status: JobStatus, updatedAt: string }[]>([])

    useEffect(() => {
        const rawHistory = getStatusHistory()
        const joined = rawHistory.map(h => {
            const job = JOBS.find(j => j.id === h.jobId)
            return job ? { job, status: h.status, updatedAt: h.updatedAt } : null
        }).filter((item): item is { job: Job, status: JobStatus, updatedAt: string } => item !== null)

        setHistory(joined)
    }, [])

    if (history.length === 0) return null

    return (
        <div style={{ marginTop: SPACING.xl, maxWidth: '700px', margin: `${SPACING.xl} auto 0`, padding: `0 ${SPACING.md}` }}>
            <h3 style={{ fontFamily: TYPOGRAPHY.FontFamily.Serif, fontSize: TYPOGRAPHY.Size.H3, marginBottom: SPACING.md, opacity: 0.8 }}>
                Recent Status Updates
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
                {history.map((item, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: SPACING.md,
                        backgroundColor: COLORS.White,
                        borderRadius: RADIUS.Default,
                        border: `1px solid ${COLORS.PrimaryText}10`,
                        borderLeft: `4px solid ${getStatusColor(item.status)}`
                    }}>
                        <div>
                            <div style={{ fontWeight: 600, fontFamily: TYPOGRAPHY.FontFamily.Base }}>{item.job.title}</div>
                            <div style={{ fontSize: '13px', opacity: 0.6 }}>{item.job.company}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                color: getStatusColor(item.status),
                                fontWeight: 600,
                                fontSize: '13px',
                                marginBottom: '2px'
                            }}>
                                {item.status}
                            </div>
                            <div style={{ fontSize: '11px', opacity: 0.4 }}>
                                {new Date(item.updatedAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function DigestPage() {
    // 1. Load preferences and dismissed jobs
    const [prefs, setPrefs] = useState<JobPreferences>(DEFAULT_PREFERENCES)
    const [dismissedJobIds, setDismissedJobIds] = useState<string[]>([])
    const [hasPreferences, setHasPreferences] = useState(false)
    const [digest, setDigest] = useState<Job[] | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    useEffect(() => {
        const loadData = () => {

            // Re-check existence in storage with defensive validation
            try {
                const raw = localStorage.getItem('jobTrackerPreferences')
                if (raw) {
                    const parsed = JSON.parse(raw)
                    // Ensure it has meaningful fields
                    const hasFields = parsed.roleKeywords?.length > 0 || parsed.skills?.length > 0
                    if (hasFields) {
                        setPrefs(parsed)
                        setHasPreferences(true)
                    } else {
                        setHasPreferences(false)
                    }
                } else {
                    setPrefs(DEFAULT_PREFERENCES)
                    setHasPreferences(false)
                }
            } catch (e) {
                console.warn('Preferences corrupted, resetting', e)
                setPrefs(DEFAULT_PREFERENCES)
                setHasPreferences(false)
            }

            try {
                const dismissed = localStorage.getItem('jobTrackerDismissedJobs')
                if (dismissed) setDismissedJobIds(JSON.parse(dismissed))
            } catch (e) { console.error(e) }

            // Load today's digest safely
            try {
                const todayKey = getTodayKey()
                const todayDigest = loadDigest(todayKey)
                if (todayDigest) {
                    setDigest(todayDigest)
                }
            } catch (e) { console.error("Digest load failed", e) }
        }

        loadData()
        window.addEventListener('storage', loadData)
        return () => window.removeEventListener('storage', loadData)
    }, [])

    // Basic Saved Jobs logic
    const [savedJobIds, setSavedJobIds] = useState<string[]>([])
    useEffect(() => {
        try {
            const saved = localStorage.getItem('savedJobIds')
            if (saved) setSavedJobIds(JSON.parse(saved))
        } catch (e) { console.error(e) }
    }, [])

    const handleSave = (id: string) => {
        let newSavedIds = savedJobIds.includes(id)
            ? savedJobIds.filter(sid => sid !== id)
            : [...savedJobIds, id]
        setSavedJobIds(newSavedIds)
        localStorage.setItem('savedJobIds', JSON.stringify(newSavedIds))
    }

    const handleDismiss = (id: string) => {
        const newDismissed = [...dismissedJobIds, id]
        setDismissedJobIds(newDismissed)
        localStorage.setItem('jobTrackerDismissedJobs', JSON.stringify(newDismissed))
    }

    // Modal logic
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleView = (id: string) => {
        const job = JOBS?.find(j => j.id === id)
        if (job) {
            setSelectedJob(job)
            setIsModalOpen(true)
        }
    }

    // Handlers
    const handleGenerate = () => {
        if (isGenerating) return

        // Double check existence (Defensive)
        const key = getTodayKey()
        const existing = loadDigest(key)
        if (existing) {
            setDigest(existing)
            return
        }

        setIsGenerating(true)
        setTimeout(() => {
            try {
                const newDigest = generateDigest(JOBS || [], prefs, dismissedJobIds)
                saveDigest(key, newDigest)
                setDigest(newDigest)
            } catch (e) {
                console.error("Generation failed", e)
            } finally {
                setIsGenerating(false)
            }
        }, 800)
    }

    const handleCopy = () => {
        if (!digest) return
        const text = formatDigestForClipboard(digest)
        navigator.clipboard.writeText(text)
        alert('Digest copied to clipboard!')
    }

    const handleEmail = () => {
        if (!digest) return
        const body = formatDigestForEmail(digest)
        const dateStr = new Date().toLocaleDateString()
        window.location.href = `mailto:?subject=My 9AM Job Digest - ${dateStr}&body=${body}`
    }

    // Live Preview Data (when digest not generated)
    const previewData = useMemo(() => {
        // Just use generateDigest logic but don't limit strictly yet, or mimic existing logic?
        // Let's use existing logic for "Live Preview" so they see what they might get
        // Actually, let's use the same filtered list so it feels consistent
        // But we won't call it "Digest" yet.
        return generateDigest(JOBS || [], prefs, dismissedJobIds)
    }, [JOBS, prefs, dismissedJobIds])

    if (!hasPreferences) {
        return (
            <div style={{ paddingBottom: SPACING.xl }}>
                <ContextHeader
                    title="Daily Digest"
                    description="Your curated list of top opportunities"
                />
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: `0 ${SPACING.md}` }}>
                    <div style={{
                        textAlign: 'center',
                        padding: SPACING.xl,
                        backgroundColor: '#FFFFFF',
                        borderRadius: RADIUS.Default,
                        border: `1px solid ${COLORS.PrimaryText}10`
                    }}>
                        <h3 style={{
                            fontFamily: TYPOGRAPHY.FontFamily.Serif,
                            fontSize: TYPOGRAPHY.Size.H3,
                            marginBottom: SPACING.md
                        }}>
                            Personalize Your Feed
                        </h3>
                        <p style={{
                            fontFamily: TYPOGRAPHY.FontFamily.Base,
                            marginBottom: SPACING.lg,
                            opacity: 0.7
                        }}>
                            Set your preferences to activate your daily curated digest.
                        </p>
                        <Button onClick={() => window.location.href = '/settings'}>
                            Go to Settings
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    // ----------------------------------------------------------------
    // STATE 1: DIGEST GENERATED (EMAIL VIEW)
    // ----------------------------------------------------------------
    if (digest) {
        const dateStr = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

        return (
            <div style={{ paddingBottom: SPACING.xl }}>
                <ContextHeader
                    title="Daily Digest"
                    description="Your official 9AM snapshot"
                />

                <div style={{ maxWidth: '700px', margin: '0 auto', padding: `0 ${SPACING.md}` }}>

                    {/* Actions Bar */}
                    <div style={{ display: 'flex', gap: SPACING.md, marginBottom: SPACING.lg, justifyContent: 'flex-end' }}>
                        <Button variant="secondary" onClick={handleCopy}>
                            Copy to Clipboard
                        </Button>
                        <Button variant="secondary" onClick={handleEmail}>
                            Create Email Draft
                        </Button>
                    </div>

                    {/* Email Card Container */}
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        border: `1px solid ${COLORS.PrimaryText}10`,
                        borderRadius: RADIUS.Default,
                        padding: SPACING.xl,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        {/* Header */}
                        <div style={{ textAlign: 'center', marginBottom: SPACING.xl, borderBottom: `1px solid ${COLORS.PrimaryText}10`, paddingBottom: SPACING.lg }}>
                            <h2 style={{
                                fontFamily: TYPOGRAPHY.FontFamily.Serif,
                                fontSize: TYPOGRAPHY.Size.H2,
                                marginBottom: SPACING.xs
                            }}>
                                Top 10 Jobs For You
                            </h2>
                            <div style={{
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                opacity: 0.6,
                                fontWeight: 600
                            }}>
                                9AM Digest • {dateStr}
                            </div>
                        </div>

                        {/* Job List */}
                        {digest.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: SPACING.xl, opacity: 0.6 }}>
                                No matching roles found today. Check your filters or try again tomorrow.
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
                                {digest.map((job, idx) => (
                                    <div key={job.id} style={{
                                        borderBottom: idx < digest.length - 1 ? `1px solid ${COLORS.PrimaryText}05` : 'none',
                                        paddingBottom: idx < digest.length - 1 ? SPACING.lg : 0
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.xs }}>
                                            <h3 style={{
                                                margin: 0,
                                                fontSize: '18px',
                                                fontFamily: TYPOGRAPHY.FontFamily.Base,
                                                fontWeight: 600
                                            }}>
                                                {job.title}
                                            </h3>
                                            <span style={{
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                color: COLORS.Accent,
                                                backgroundColor: `${COLORS.Accent}10`,
                                                padding: '2px 8px',
                                                borderRadius: '12px'
                                            }}>
                                                {job.matchScore}% Match
                                            </span>
                                        </div>

                                        <div style={{ fontSize: '15px', color: COLORS.PrimaryText, opacity: 0.8, marginBottom: SPACING.sm }}>
                                            {job.company} • {job.location} ({job.mode})
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: SPACING.sm }}>
                                            <div style={{ fontSize: '13px', opacity: 0.6 }}>
                                                {job.experience} • {job.salaryRange}
                                            </div>
                                            <a
                                                href={job.applyUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{
                                                    textDecoration: 'none',
                                                    color: COLORS.Accent,
                                                    fontSize: '14px',
                                                    fontWeight: 600
                                                }}
                                            >
                                                Apply Now →
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Footer */}
                        <div style={{
                            marginTop: SPACING.xl,
                            paddingTop: SPACING.lg,
                            borderTop: `1px solid ${COLORS.PrimaryText}10`,
                            textAlign: 'center',
                            fontSize: '12px',
                            opacity: 0.5
                        }}>
                            This digest was generated based on your preferences using our intelligent matching engine.
                            <br />
                            © 2026 Job Notification Tracker
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: SPACING.md, fontSize: '12px', opacity: 0.4 }}>
                        Demo Mode: Daily 9AM trigger simulated manually.
                    </div>
                </div>

                <RecentActivity />
            </div>
        )
    }

    // ----------------------------------------------------------------
    // STATE 2: LIVE PREVIEW (NOT GENERATED)
    // ----------------------------------------------------------------
    return (
        <div style={{ paddingBottom: SPACING.xl }}>
            <ContextHeader
                title="Daily Digest"
                description="Your curated list of top opportunities"
            />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${SPACING.md}` }}>
                {/* Generation CTA */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    border: `1px solid ${COLORS.PrimaryText}10`,
                    borderRadius: RADIUS.Default,
                    padding: SPACING.lg,
                    marginBottom: SPACING.xl,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: SPACING.md
                }}>
                    <div>
                        <h3 style={{ fontFamily: TYPOGRAPHY.FontFamily.Serif, fontSize: '20px', marginBottom: SPACING.xs }}>
                            Ready for your digest?
                        </h3>
                        <p style={{ opacity: 0.7, maxWidth: '500px' }}>
                            Generate your official 9AM snapshot based on your current preferences.
                            This will create a static list you can copy or email.
                        </p>
                    </div>
                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        style={{ minWidth: '240px' }}
                    >
                        {isGenerating ? 'Generating...' : "Generate Today's 9AM Digest (Simulated)"}
                    </Button>
                    <div style={{ fontSize: '12px', opacity: 0.4 }}>
                        Demo Mode: Daily 9AM trigger simulated manually.
                    </div>
                </div>

                {/* Preview Grid */}
                <h3 style={{
                    fontFamily: TYPOGRAPHY.FontFamily.Serif,
                    fontSize: TYPOGRAPHY.Size.H3,
                    marginBottom: SPACING.md,
                    opacity: 0.5
                }}>
                    Live Preview ({previewData.length} Matches)
                </h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: SPACING.lg,
                    opacity: 0.7 // Slight fade to indicate this is preview
                }}>
                    {previewData.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={savedJobIds.includes(job.id)}
                            onSave={handleSave}
                            onView={handleView}
                            onDismiss={handleDismiss}
                        />
                    ))}

                    {previewData.length === 0 && (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            opacity: 0.6,
                            padding: SPACING.xl,
                            border: `1px dashed ${COLORS.PrimaryText}20`,
                            borderRadius: RADIUS.Default
                        }}>
                            No roles qualified for today’s digest. Adjust your preferences.
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && selectedJob && (
                <JobModal
                    job={selectedJob}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            <RecentActivity />
        </div>
    )
}
