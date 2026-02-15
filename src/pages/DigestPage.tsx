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
import { scoreJobs } from '../lib/matchingEngine'
import { loadPreferences } from '../lib/preferences'

export function DigestPage() {
    // 1. Load preferences and dismissed jobs
    const [prefs, setPrefs] = useState<JobPreferences>(DEFAULT_PREFERENCES)
    const [dismissedJobIds, setDismissedJobIds] = useState<string[]>([])
    const [hasPreferences, setHasPreferences] = useState(false)

    useEffect(() => {
        const loadData = () => {
            const loadedPrefs = loadPreferences()

            // Re-check existence in storage
            const raw = localStorage.getItem('jobTrackerPreferences')
            if (raw) {
                setPrefs(loadedPrefs)
                setHasPreferences(true)
            } else {
                setPrefs(DEFAULT_PREFERENCES)
                setHasPreferences(false)
            }

            try {
                const dismissed = localStorage.getItem('jobTrackerDismissedJobs')
                if (dismissed) setDismissedJobIds(JSON.parse(dismissed))
            } catch (e) { console.error(e) }
        }

        loadData()
        window.addEventListener('storage', loadData)
        return () => window.removeEventListener('storage', loadData)
    }, [])

    // Basic Saved Jobs logic (for JobCard compatibility)
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

    // 2. Digest Computation
    const digestData = useMemo(() => {
        if (!JOBS || !hasPreferences) return {
            jobs: [],
            totalEvaluated: 0,
            passedThreshold: 0,
            excludedDismissed: 0
        }

        const totalEvaluated = JOBS.length
        let excludedDismissed = 0
        let passedThreshold = 0

        // Step A: Calculate Match Scores using Engine
        const scoredJobs = scoreJobs(JOBS, prefs)

        // Step B: Filter
        const eligibleJobs = scoredJobs.filter(job => {
            const isDismissed = dismissedJobIds.includes(job.id)
            if (isDismissed) {
                excludedDismissed++
                return false
            }

            const passesThreshold = (job.matchScore || 0) >= prefs.minMatchScore
            if (passesThreshold) {
                passedThreshold++
                return true
            }
            return false
        })

        // Step C: Sort and Limit
        const topJobs = eligibleJobs.sort((a, b) => {
            const scoreA = a.matchScore || 0;
            const scoreB = b.matchScore || 0;

            // 1. Score Descending
            if (scoreB !== scoreA) return scoreB - scoreA
            // 2. Date Posted Ascending (Newer first)
            return a.postedDaysAgo - b.postedDaysAgo
        }).slice(0, 10)

        return {
            jobs: topJobs,
            totalEvaluated,
            passedThreshold,
            excludedDismissed
        }
    }, [JOBS, prefs, dismissedJobIds, hasPreferences])

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

    return (
        <div style={{ paddingBottom: SPACING.xl }}>
            <ContextHeader
                title="Daily Digest"
                description="Your curated list of top opportunities"
            />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${SPACING.md}` }}>

                {/* Metadata Panel */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: SPACING.lg,
                    marginBottom: SPACING.xl,
                    padding: SPACING.md,
                    backgroundColor: '#FFFFFF',
                    borderRadius: RADIUS.Default,
                    border: `1px solid ${COLORS.PrimaryText}10`
                }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ fontSize: '12px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Processed</div>
                        <div style={{ fontSize: '24px', fontFamily: TYPOGRAPHY.FontFamily.Serif }}>{digestData.totalEvaluated} Roles</div>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ fontSize: '12px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Qualified Matches</div>
                        <div style={{ fontSize: '24px', fontFamily: TYPOGRAPHY.FontFamily.Serif }}>{digestData.passedThreshold} Scored {prefs.minMatchScore}%+</div>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ fontSize: '12px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hidden</div>
                        <div style={{ fontSize: '24px', fontFamily: TYPOGRAPHY.FontFamily.Serif }}>{digestData.excludedDismissed} Dismissed</div>
                    </div>
                </div>

                {/* List Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: SPACING.md
                }}>
                    <h2 style={{
                        fontFamily: TYPOGRAPHY.FontFamily.Serif,
                        fontSize: TYPOGRAPHY.Size.H2
                    }}>
                        Your Top Matches for Today
                    </h2>
                    <span style={{ fontSize: '14px', opacity: 0.6 }}>
                        Threshold: {prefs.minMatchScore}% Match Score
                    </span>
                </div>

                {/* Job Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: SPACING.lg
                }}>
                    {digestData.jobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={savedJobIds.includes(job.id)}
                            onSave={handleSave}
                            onView={handleView}
                            onDismiss={handleDismiss}
                        />
                    ))}

                    {digestData.jobs.length === 0 && (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            opacity: 0.6,
                            padding: SPACING.xl,
                            border: `1px dashed ${COLORS.PrimaryText}20`,
                            borderRadius: RADIUS.Default
                        }}>
                            No roles qualified for today’s digest. Adjust your preferences or lower your match threshold.
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
        </div>
    )
}
