import { useState, useEffect } from 'react'
import { ContextHeader } from '../layout/ContextHeader'
import { TwoColumnLayout } from '../layout/TwoColumnLayout'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { COLORS } from '../design-system/tokens/colors'
import { SPACING } from '../design-system/tokens/spacing'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { RADIUS } from '../design-system/tokens/radius'
import type { JobPreferences } from '../types/preferences'
import { DEFAULT_PREFERENCES } from '../types/preferences'
import { loadPreferences, savePreferences } from '../lib/preferences'

const LOCATIONS = [
    'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Gurgaon',
    'Noida', 'Mumbai', 'Mysore', 'Trivandrum', 'Remote'
]

const MODES = ['Remote', 'Hybrid', 'Onsite']

const EXPERIENCE_LEVELS = [
    'Fresher', '0-1 years', '0-2 years', '1-3 years',
    '2-5 years', '3-6 years', '4-7 years', '5+ years'
]

export function SettingsPage() {
    const [prefs, setPrefs] = useState<JobPreferences>(DEFAULT_PREFERENCES)
    const [roleInput, setRoleInput] = useState('')
    const [skillInput, setSkillInput] = useState('')
    const [isSaved, setIsSaved] = useState(false)

    // Load preferences on mount
    // Load preferences on mount
    useEffect(() => {
        const loaded = loadPreferences()
        const raw = localStorage.getItem('jobTrackerPreferences')
        if (raw) {
            setPrefs(loaded)
            setRoleInput(loaded.roleKeywords?.join(', ') || '')
            setSkillInput(loaded.skills?.join(', ') || '')
        }
    }, [])

    const handleSave = () => {
        try {
            // Process inputs
            const proccessedRoles = roleInput.split(',').map(s => s.trim()).filter(Boolean)
            const processedSkills = skillInput.split(',').map(s => s.trim()).filter(Boolean)

            const newPrefs: JobPreferences = {
                ...prefs,
                roleKeywords: proccessedRoles,
                skills: processedSkills
            }

            setPrefs(newPrefs)
            savePreferences(newPrefs)

            setIsSaved(true)
            setTimeout(() => setIsSaved(false), 2000)
        } catch (e) {
            console.error('Failed to save preferences', e)
        }
    }

    const toggleLocation = (loc: string) => {
        const current = prefs.preferredLocations
        const updated = current.includes(loc)
            ? current.filter(l => l !== loc)
            : [...current, loc]
        setPrefs({ ...prefs, preferredLocations: updated })
    }

    const toggleMode = (mode: string) => {
        const current = prefs.preferredMode
        const updated = current.includes(mode)
            ? current.filter(m => m !== mode)
            : [...current, mode]
        setPrefs({ ...prefs, preferredMode: updated })
    }

    const labelStyle = {
        display: 'block',
        marginBottom: SPACING.xs,
        fontFamily: TYPOGRAPHY.FontFamily.Base,
        fontSize: TYPOGRAPHY.Size.Body,
        color: COLORS.PrimaryText,
        fontWeight: 600
    }

    const checkboxStyle = {
        marginRight: SPACING.xs,
        accentColor: COLORS.Accent,
        cursor: 'pointer'
    }

    return (
        <>
            <ContextHeader
                title="Settings"
                description="Configure your job matching preferences"
            />

            <TwoColumnLayout
                leftContent={
                    <Card>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>

                            {/* Role Keywords */}
                            <div>
                                <label style={labelStyle}>Role Keywords (comma separated)</label>
                                <Input
                                    placeholder="e.g. SDE, Frontend, React Developer"
                                    value={roleInput}
                                    onChange={(e) => setRoleInput(e.target.value)}
                                />
                            </div>

                            {/* Preferred Locations */}
                            <div>
                                <label style={labelStyle}>Preferred Locations</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: SPACING.md }}>
                                    {LOCATIONS.map(loc => (
                                        <label key={loc} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={prefs.preferredLocations.includes(loc)}
                                                onChange={() => toggleLocation(loc)}
                                                style={checkboxStyle}
                                            />
                                            {loc}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Work Mode */}
                            <div>
                                <label style={labelStyle}>Preferred Mode</label>
                                <div style={{ display: 'flex', gap: SPACING.lg }}>
                                    {MODES.map(mode => (
                                        <label key={mode} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={prefs.preferredMode.includes(mode)}
                                                onChange={() => toggleMode(mode)}
                                                style={checkboxStyle}
                                            />
                                            {mode}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Experience Level */}
                            <div>
                                <label style={labelStyle}>Experience Level</label>
                                <select
                                    value={prefs.experienceLevel}
                                    onChange={(e) => setPrefs({ ...prefs, experienceLevel: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: SPACING.sm,
                                        borderRadius: RADIUS.Default,
                                        border: `1px solid ${COLORS.PrimaryText}20`,
                                        fontFamily: TYPOGRAPHY.FontFamily.Base,
                                        fontSize: TYPOGRAPHY.Size.Body,
                                        outline: 'none',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <option value="">Select Experience Level</option>
                                    {EXPERIENCE_LEVELS.map(exp => (
                                        <option key={exp} value={exp}>{exp}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Skills */}
                            <div>
                                <label style={labelStyle}>Skills (comma separated)</label>
                                <Input
                                    placeholder="e.g. Java, Python, React, AWS"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                />
                            </div>

                            {/* Min Match Score */}
                            <div>
                                <label style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Minimum Match Score</span>
                                    <span>{prefs.minMatchScore}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={prefs.minMatchScore}
                                    onChange={(e) => setPrefs({ ...prefs, minMatchScore: Number(e.target.value) })}
                                    style={{ width: '100%', accentColor: COLORS.Accent }}
                                />
                            </div>

                            <div style={{ marginTop: SPACING.md, display: 'flex', gap: SPACING.md, alignItems: 'center' }}>
                                <Button onClick={handleSave}>
                                    {isSaved ? 'Saved!' : 'Save Preferences'}
                                </Button>

                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to restore all dismissed jobs?')) {
                                            localStorage.removeItem('jobTrackerDismissedJobs')
                                            alert('Dismissed jobs have been restored.')
                                        }
                                    }}
                                    style={{
                                        borderColor: `${COLORS.Accent}40`,
                                        color: COLORS.Accent,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    Reset Dismissed Jobs
                                </Button>
                            </div>

                        </div>
                    </Card>
                }
                rightContent={
                    <div style={{
                        fontFamily: TYPOGRAPHY.FontFamily.Base,
                        fontSize: TYPOGRAPHY.Size.Body,
                        color: COLORS.PrimaryText,
                        opacity: 0.7,
                        lineHeight: TYPOGRAPHY.LineHeight.Relaxed
                    }}>
                        <h3 style={{
                            fontFamily: TYPOGRAPHY.FontFamily.Serif,
                            fontSize: TYPOGRAPHY.Size.H3,
                            marginBottom: SPACING.sm,
                            color: COLORS.PrimaryText,
                            opacity: 1
                        }}>
                            Your Preferences
                        </h3>
                        <p>
                            We use these settings to calculate a Match Score for every job.
                        </p>
                        <ul style={{ paddingLeft: '20px', marginTop: SPACING.md, display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
                            <li><strong>Keywords</strong> help categorize relevant roles.</li>
                            <li><strong>Locations</strong> prioritize jobs in your target cities.</li>
                            <li><strong>Skills</strong> boost scores for tech stack alignment.</li>
                            <li><strong>Score Threshold</strong> filters out low-relevance jobs from your daily digest.</li>
                        </ul>
                    </div>
                }
            />
        </>
    )
}
