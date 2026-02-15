export interface Job {
    id: string
    title: string
    company: string
    location: string
    mode: 'Remote' | 'Hybrid' | 'Onsite'
    experience: string
    skills: string[]
    source: string
    postedDaysAgo: number
    salaryRange: string
    applyUrl: string
    description: string
}
