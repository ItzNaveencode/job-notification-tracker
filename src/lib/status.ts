export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected'

export interface JobStatusUpdate {
    status: JobStatus
    updatedAt: string
}

export type JobStatusMap = { [jobId: string]: JobStatusUpdate }

export function loadJobStatuses(): JobStatusMap {
    try {
        const stored = localStorage.getItem('jobTrackerStatus')
        return stored ? JSON.parse(stored) : {}
    } catch (e) {
        console.error('Failed to load statuses', e)
        return {}
    }
}

export function saveJobStatus(jobId: string, status: JobStatus): void {
    try {
        const current = loadJobStatuses()
        const update: JobStatusUpdate = {
            status,
            updatedAt: new Date().toISOString()
        }
        const updated = { ...current, [jobId]: update }
        localStorage.setItem('jobTrackerStatus', JSON.stringify(updated))
    } catch (e) {
        console.error('Failed to save status', e)
    }
}

export function getStatusColor(status: JobStatus): string {
    switch (status) {
        case 'Applied': return '#1967D2' // Blue
        case 'Rejected': return '#C5221F' // Red
        case 'Selected': return '#137333' // Green
        default: return '#5F6368' // Neutral Grey
    }
}

export function getStatusHistory(): { jobId: string, status: JobStatus, updatedAt: string }[] {
    const map = loadJobStatuses()
    return Object.entries(map).map(([jobId, data]) => ({
        jobId,
        ...data
    })).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}
