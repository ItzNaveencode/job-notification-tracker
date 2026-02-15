export interface JobPreferences {
    roleKeywords: string[]
    preferredLocations: string[]
    preferredMode: string[]
    experienceLevel: string
    skills: string[]
    minMatchScore: number
}

export const DEFAULT_PREFERENCES: JobPreferences = {
    roleKeywords: [],
    preferredLocations: [],
    preferredMode: [],
    experienceLevel: '',
    skills: [],
    minMatchScore: 40
}
