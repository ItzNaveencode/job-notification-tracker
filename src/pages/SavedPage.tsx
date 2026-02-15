import { useState, useEffect } from 'react'
import { ContextHeader } from '../layout/ContextHeader'
import { JobCard } from '../components/JobCard'
import { JobModal } from '../components/JobModal'
import { Toast } from '../components/Toast'
import type { Job } from '../types/job'
import { SPACING } from '../design-system/tokens/spacing'
import { COLORS } from '../design-system/tokens/colors'
import { RADIUS } from '../design-system/tokens/radius'
import { JOBS } from '../data/jobs'
import { loadJobStatuses, saveJobStatus } from '../lib/status'
import type { JobStatus, JobStatusMap } from '../lib/status'

export function SavedPage() {
    const [savedJobs, setSavedJobs] = useState<Job[]>([])
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [statuses, setStatuses] = useState<JobStatusMap>({})
    const [toastMsg, setToastMsg] = useState<string | null>(null)

    useEffect(() => {
        try {
            if (!JOBS) return
            const savedIds = JSON.parse(localStorage.getItem('savedJobIds') || '[]')
            const jobs = JOBS.filter(job => savedIds.includes(job.id))
            setSavedJobs(jobs)
            setStatuses(loadJobStatuses())
        } catch (e) {
            console.error('Failed to load saved jobs', e)
        }
    }, [])

    const handleUnsave = (id: string) => {
        const newJobs = savedJobs.filter(j => j.id !== id)
        setSavedJobs(newJobs)

        const savedIds = newJobs.map(j => j.id)
        localStorage.setItem('savedJobIds', JSON.stringify(savedIds))
    }

    const handleView = (id: string) => {
        const job = JOBS?.find(j => j.id === id) || null
        if (job) {
            setSelectedJob(job)
            setIsModalOpen(true)
        }
    }

    const handleStatusChange = (id: string, newStatus: JobStatus) => {
        saveJobStatus(id, newStatus)
        setStatuses(prev => ({
            ...prev,
            [id]: { status: newStatus, updatedAt: new Date().toISOString() }
        }))

        if (newStatus !== 'Not Applied') {
            setToastMsg(`Status updated: ${newStatus}`)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedJob(null)
    }

    return (
        <div style={{ paddingBottom: SPACING.xl }}>
            <ContextHeader
                title="Saved Jobs"
                description="Your curated list of opportunities"
            />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${SPACING.md}` }}>
                {savedJobs.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: SPACING.lg
                    }}>
                        {savedJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSaved={true}
                                onSave={handleUnsave}
                                onView={handleView}
                                status={statuses[job.id]?.status || 'Not Applied'}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: SPACING.xl,
                        border: `1px dashed ${COLORS.PrimaryText}20`,
                        borderRadius: RADIUS.Default,
                        color: COLORS.PrimaryText,
                        opacity: 0.6
                    }}>
                        <p>You haven't saved any jobs yet.</p>
                    </div>
                )}
            </div>

            {isModalOpen && selectedJob && (
                <JobModal
                    job={selectedJob}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}

            {toastMsg && (
                <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
            )}
        </div>
    )
}
