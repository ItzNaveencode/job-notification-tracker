import type { JobPreferences } from '../types/preferences'
import { DEFAULT_PREFERENCES } from '../types/preferences'

export function loadPreferences(): JobPreferences {
    try {
        const json = localStorage.getItem('jobTrackerPreferences');
        if (!json) {
            return DEFAULT_PREFERENCES;
        }

        const parsed = JSON.parse(json);

        // Normalize and ensure types safely
        return {
            ...DEFAULT_PREFERENCES,
            ...parsed,
            roleKeywords: Array.isArray(parsed.roleKeywords)
                ? parsed.roleKeywords.map((k: any) => String(k).trim().toLowerCase())
                : DEFAULT_PREFERENCES.roleKeywords,
            preferredLocations: Array.isArray(parsed.preferredLocations)
                ? parsed.preferredLocations.map((l: any) => String(l).trim().toLowerCase())
                : DEFAULT_PREFERENCES.preferredLocations,
            preferredMode: Array.isArray(parsed.preferredMode)
                ? parsed.preferredMode.map((m: any) => String(m).trim().toLowerCase())
                : DEFAULT_PREFERENCES.preferredMode,
            experienceLevel: String(parsed.experienceLevel || '').trim().toLowerCase(),
            skills: Array.isArray(parsed.skills)
                ? parsed.skills.map((s: any) => String(s).trim().toLowerCase())
                : DEFAULT_PREFERENCES.skills,
            minMatchScore: Number(parsed.minMatchScore) || DEFAULT_PREFERENCES.minMatchScore
        };
    } catch (error) {
        console.error('Failed to load preferences:', error);
        return DEFAULT_PREFERENCES;
    }
}

export function savePreferences(prefs: JobPreferences): void {
    try {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
    } catch (error) {
        console.error('Failed to save preferences:', error);
    }
}
