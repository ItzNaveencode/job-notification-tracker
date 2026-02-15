export interface ChecklistState {
    preferencesPersist: boolean
    matchScoreCorrect: boolean
    showOnlyToggleWorks: boolean
    savePersist: boolean
    applyNewTab: boolean
    statusPersist: boolean
    statusFilterWorks: boolean
    digestTop10: boolean
    digestPersist: boolean
    noConsoleErrors: boolean
}

export const DEFAULT_CHECKLIST: ChecklistState = {
    preferencesPersist: false,
    matchScoreCorrect: false,
    showOnlyToggleWorks: false,
    savePersist: false,
    applyNewTab: false,
    statusPersist: false,
    statusFilterWorks: false,
    digestTop10: false,
    digestPersist: false,
    noConsoleErrors: false
}

export const CHECKLIST_STORAGE_KEY = 'jobTrackerTestChecklist'

export interface ChecklistItemDef {
    key: keyof ChecklistState
    label: string
    testInstructions: string
}

export const CHECKLIST_ITEMS: ChecklistItemDef[] = [
    { key: 'preferencesPersist', label: 'Preferences persist after refresh', testInstructions: 'Go to Settings, change a value, refresh the page, verify value remains.' },
    { key: 'matchScoreCorrect', label: 'Match score calculates correctly', testInstructions: 'Verify a job matches your keywords/skills and shows a sensible score.' },
    { key: 'showOnlyToggleWorks', label: '"Show only matches" toggle works', testInstructions: 'Toggle "Show only matches" on Dashboard and ensure list filters.' },
    { key: 'savePersist', label: 'Save job persists after refresh', testInstructions: 'Save a job, refresh, go to Saved Jobs, verify it is still there.' },
    { key: 'applyNewTab', label: 'Apply opens in new tab', testInstructions: 'Click "Apply Now", verify it opens in a new browser tab.' },
    { key: 'statusPersist', label: 'Status update persists after refresh', testInstructions: 'Change status to "Applied", refresh, verify status remains.' },
    { key: 'statusFilterWorks', label: 'Status filter works correctly', testInstructions: 'Filter by "Applied" and ensure only Applied jobs show.' },
    { key: 'digestTop10', label: 'Digest generates top 10 by score', testInstructions: 'Generate digest, verify no more than 10 jobs and sorted by score.' },
    { key: 'digestPersist', label: 'Digest persists for the day', testInstructions: 'Generate digest, refresh, verify digest remains same for today.' },
    { key: 'noConsoleErrors', label: 'No console errors on main pages', testInstructions: 'Open DevTools console, navigate pages, verify no red errors.' }
]
