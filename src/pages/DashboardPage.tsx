import { useState, useEffect, useMemo } from 'react'
import { ContextHeader } from '../layout/ContextHeader'
import { FilterBar } from '../components/FilterBar'
import { JobCard } from '../components/JobCard'
import { JobModal } from '../components/JobModal'
import type { Job } from '../types/job'
import { SPACING } from '../design-system/tokens/spacing'
import { COLORS } from '../design-system/tokens/colors'
import { RADIUS } from '../design-system/tokens/radius'
import { JOBS } from '../data/jobs'
import type { JobPreferences } from '../types/preferences'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { DEFAULT_PREFERENCES } from '../types/preferences'
import { scoreJobs } from '../lib/matchingEngine'
import { loadPreferences } from '../lib/preferences'

interface FilterState {
    keyword: string
    location: string
    mode: string
    experience: string
    source: string
    sort: string
}

export function DashboardPage() {
    // 1. Load preferences
    const [prefs, setPrefs] = useState<JobPreferences>(DEFAULT_PREFERENCES)
    const [useThreshold, setUseThreshold] = useState(true)

    useEffect(() => {
        const loadPrefs = () => {
            const loaded = loadPreferences()
            setPrefs(loaded)
        }

        loadPrefs()
        window.addEventListener('storage', loadPrefs)
        return () => window.removeEventListener('storage', loadPrefs)
    }, [])

    const [filters, setFilters] = useState<FilterState>({
        keyword: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        sort: 'latest' // Default sort: Latest
    })

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

    // Dismissed Jobs Logic
    const [dismissedJobIds, setDismissedJobIds] = useState<string[]>([])
    useEffect(() => {
        try {
            const dismissed = localStorage.getItem('jobTrackerDismissedJobs')
            if (dismissed) setDismissedJobIds(JSON.parse(dismissed))
        } catch (e) { console.error(e) }
    }, [])

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

    // 2. Main Data Pipeline
    const processedData = useMemo(() => {
        if (!JOBS) return { jobs: [], isFilteredOutByDismiss: false }

        // Step A: Calculate Match Scores based on loaded Preferences
        // Step A: Calculate Match Scores based on loaded Preferences
        const scoredJobs = scoreJobs(JOBS, prefs)

        // Step B: Filter
        let matchingJobs = scoredJobs.filter(job => {
            // 1. Global Search Filter
            if (filters.keyword) {
                const lowerKw = filters.keyword.toLowerCase()
                if (!job.title.toLowerCase().includes(lowerKw) &&
                    !job.company.toLowerCase().includes(lowerKw)) return false
            }
            if (filters.location && job.location !== filters.location) return false
            if (filters.mode && job.mode !== filters.mode) return false
            if (filters.experience && job.experience !== filters.experience) return false
            if (filters.source && job.source !== filters.source) return false

            // 2. Threshold Filter (Toggleable)
            if (useThreshold && (job.matchScore || 0) < prefs.minMatchScore) return false

            return true
        })

        // Step C: Exclude Dismissed
        const finalJobs = matchingJobs.filter(job => !dismissedJobIds.includes(job.id))
        const isFilteredOutByDismiss = matchingJobs.length > 0 && finalJobs.length === 0

        // Step D: Sort
        finalJobs.sort((a, b) => {
            if (filters.sort === 'latest') {
                return a.postedDaysAgo - b.postedDaysAgo
            } else if (filters.sort === 'oldest') {
                return b.postedDaysAgo - a.postedDaysAgo
            } else if (filters.sort === 'score_high') { // Future proof
                return (b.matchScore || 0) - (a.matchScore || 0)
            }
            return 0
        })

        return { jobs: finalJobs, isFilteredOutByDismiss }
    }, [prefs, filters, useThreshold, dismissedJobIds])

    return (
        <div style={{ paddingBottom: SPACING.xl }}>
            <ContextHeader
                title="Dashboard"
                description="Your daily job feed overview"
            />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${SPACING.md}` }}>
                <FilterBar filters={filters} onFilterChange={setFilters} />

                {/* Threshold Toggle Control */}
                <div style={{
                    marginBottom: SPACING.md,
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING.sm,
                    padding: SPACING.sm,
                    backgroundColor: '#FFFFFF', // COLORS.White was removed
                    borderRadius: RADIUS.Default,
                    border: `1px solid ${COLORS.PrimaryText}10`,
                    width: 'fit-content'
                }}>
                    <input
                        type="checkbox"
                        checked={useThreshold}
                        onChange={(e) => setUseThreshold(e.target.checked)}
                        style={{ accentColor: COLORS.Accent, cursor: 'pointer' }}
                        id="threshold-toggle"
                    />
                    <label htmlFor="threshold-toggle" style={{
                        fontSize: '14px',
                        color: COLORS.PrimaryText,
                        cursor: 'pointer',
                        fontFamily: TYPOGRAPHY.FontFamily.Base
                    }}>
                        Only show jobs with <strong>{prefs.minMatchScore}%+</strong> Match Score
                    </label>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: SPACING.lg
                }}>
                    {processedData.jobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={savedJobIds.includes(job.id)}
                            onSave={handleSave}
                            onView={handleView}
                            onDismiss={handleDismiss}
                        />
                    ))}

                    {processedData.jobs.length === 0 && (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            opacity: 0.6,
                            padding: SPACING.xl
                        }}>
                            {processedData.isFilteredOutByDismiss
                                ? "You’ve dismissed all available roles. Clear filters or reset dismissed jobs."
                                : "No roles match your criteria. Adjust filters or lower threshold."}
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
