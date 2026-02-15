import { useState, useEffect, useMemo } from 'react'
import { ContextHeader } from '../layout/ContextHeader'
import { FilterBar } from '../components/FilterBar'
import { JobCard } from '../components/JobCard'
import { JobModal } from '../components/JobModal'
import type { Job } from '../types/job'
import { SPACING } from '../design-system/tokens/spacing'
import { JOBS } from '../data/jobs'

interface FilterState {
    keyword: string
    location: string
    mode: string
    experience: string
    source: string
    sort: string
}

export function DashboardPage() {
    const [filters, setFilters] = useState<FilterState>({
        keyword: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        sort: 'latest'
    })

    const [savedJobIds, setSavedJobIds] = useState<string[]>([])
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Load saved jobs from local storage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('savedJobIds')
            if (saved) {
                setSavedJobIds(JSON.parse(saved))
            }
        } catch (e) {
            console.error('Failed to load saved jobs', e)
        }
    }, [])

    const handleSave = (id: string) => {
        let newSavedIds
        if (savedJobIds.includes(id)) {
            newSavedIds = savedJobIds.filter(savedId => savedId !== id)
        } else {
            newSavedIds = [...savedJobIds, id]
        }
        setSavedJobIds(newSavedIds)
        localStorage.setItem('savedJobIds', JSON.stringify(newSavedIds))
    }

    const handleView = (id: string) => {
        const job = JOBS?.find(j => j.id === id) || null
        if (job) {
            setSelectedJob(job)
            setIsModalOpen(true)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedJob(null)
    }

    const filteredJobs = useMemo(() => {
        if (!JOBS) return []

        return JOBS.filter(job => {
            // Keyword
            if (filters.keyword) {
                const lowerKeyword = filters.keyword.toLowerCase()
                if (!job.title.toLowerCase().includes(lowerKeyword) &&
                    !job.company.toLowerCase().includes(lowerKeyword)) {
                    return false
                }
            }

            // Location
            if (filters.location && job.location !== filters.location) return false

            // Mode
            if (filters.mode && job.mode !== filters.mode) return false

            // Experience
            if (filters.experience && job.experience !== filters.experience) return false

            // Source
            if (filters.source && job.source !== filters.source) return false

            return true
        }).sort((a, b) => {
            if (filters.sort === 'latest') {
                return a.postedDaysAgo - b.postedDaysAgo
            } else {
                return b.postedDaysAgo - a.postedDaysAgo
            }
        })
    }, [filters])

    return (
        <div style={{ paddingBottom: SPACING.xl }}>
            <ContextHeader
                title="Dashboard"
                description="Your daily job feed overview"
            />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${SPACING.md}` }}>
                <FilterBar filters={filters} onFilterChange={setFilters} />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: SPACING.lg
                }}>
                    {filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={savedJobIds.includes(job.id)}
                            onSave={handleSave}
                            onView={handleView}
                        />
                    ))}

                    {filteredJobs.length === 0 && (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            opacity: 0.6,
                            padding: SPACING.xl
                        }}>
                            No jobs found matching your filters.
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && selectedJob && (
                <JobModal
                    job={selectedJob}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}
