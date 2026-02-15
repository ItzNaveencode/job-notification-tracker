import { useState, useEffect } from 'react'
import { ContextHeader } from '../layout/ContextHeader'
import { Button } from '../components/Button'
import { SPACING } from '../design-system/tokens/spacing'
import { COLORS } from '../design-system/tokens/colors'
import { RADIUS } from '../design-system/tokens/radius'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import {
    CHECKLIST_ITEMS,
    DEFAULT_CHECKLIST,
    CHECKLIST_STORAGE_KEY
} from '../lib/checklist'
import type { ChecklistState } from '../lib/checklist'

export function TestPage() {
    const [state, setState] = useState<ChecklistState>(DEFAULT_CHECKLIST)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        try {
            const stored = localStorage.getItem(CHECKLIST_STORAGE_KEY)
            if (stored) {
                setState(JSON.parse(stored))
            }
        } catch (e) {
            console.error('Failed to load checklist', e)
        } finally {
            setLoaded(true)
        }
    }, [])

    const handleToggle = (key: keyof ChecklistState) => {
        const newState = { ...state, [key]: !state[key] }
        setState(newState)
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(newState))
    }

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all test progress?')) {
            setState(DEFAULT_CHECKLIST)
            localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(DEFAULT_CHECKLIST))
        }
    }

    const passedCount = Object.values(state).filter(Boolean).length
    const allPassed = passedCount === CHECKLIST_ITEMS.length

    if (!loaded) return null

    return (
        <div style={{ paddingBottom: SPACING.xl }}>
            <ContextHeader
                title="System Verification"
                description="Run manual tests before shipping"
            />

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: `0 ${SPACING.md}` }}>

                {/* Score Card */}
                <div style={{
                    backgroundColor: COLORS.White,
                    padding: SPACING.lg,
                    borderRadius: RADIUS.Default,
                    border: `1px solid ${COLORS.PrimaryText}10`,
                    marginBottom: SPACING.xl,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <h2 style={{
                            fontFamily: TYPOGRAPHY.FontFamily.Serif,
                            fontSize: TYPOGRAPHY.Size.H3,
                            marginBottom: SPACING.xs
                        }}>
                            Tests Passed: {passedCount} / {CHECKLIST_ITEMS.length}
                        </h2>
                        {!allPassed && (
                            <div style={{ color: '#D9534F', fontSize: '14px', fontWeight: 600 }}>
                                ⚠️ Resolve all issues before shipping.
                            </div>
                        )}
                        {allPassed && (
                            <div style={{ color: '#2ECC71', fontSize: '14px', fontWeight: 600 }}>
                                ✓ All systems verified. Ready to ship.
                            </div>
                        )}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <Button variant="secondary" onClick={handleReset}>
                            Reset Test Status
                        </Button>
                    </div>
                </div>

                {/* Checklist */}
                <div style={{
                    backgroundColor: COLORS.White,
                    borderRadius: RADIUS.Default,
                    border: `1px solid ${COLORS.PrimaryText}10`,
                    overflow: 'hidden'
                }}>
                    {CHECKLIST_ITEMS.map((item, index) => (
                        <div key={item.key} style={{
                            padding: SPACING.md,
                            borderBottom: index < CHECKLIST_ITEMS.length - 1 ? `1px solid ${COLORS.PrimaryText}05` : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: SPACING.md,
                            transition: 'background-color 0.2s',
                            backgroundColor: state[item.key] ? `${COLORS.Background}` : 'transparent'
                        }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: SPACING.md,
                                cursor: 'pointer',
                                flex: 1
                            }}>
                                <input
                                    type="checkbox"
                                    checked={state[item.key]}
                                    onChange={() => handleToggle(item.key)}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        accentColor: COLORS.Accent,
                                        cursor: 'pointer'
                                    }}
                                />
                                <span style={{
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    textDecoration: state[item.key] ? 'line-through' : 'none',
                                    opacity: state[item.key] ? 0.6 : 1,
                                    color: COLORS.PrimaryText
                                }}>
                                    {item.label}
                                </span>
                            </label>

                            <div
                                title={item.testInstructions}
                                style={{
                                    fontSize: '12px',
                                    color: COLORS.PrimaryText,
                                    opacity: 0.5,
                                    border: `1px solid ${COLORS.PrimaryText}20`,
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'help',
                                    fontWeight: 600
                                }}
                            >
                                ?
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation CTA */}
                <div style={{ marginTop: SPACING.xl, textAlign: 'center' }}>
                    <Button
                        disabled={!allPassed}
                        onClick={() => window.location.href = '/jt/08-ship'}
                        style={{
                            opacity: allPassed ? 1 : 0.5,
                            cursor: allPassed ? 'pointer' : 'not-allowed'
                        }}
                    >
                        {allPassed ? 'Proceed to Ship Gate →' : 'Complete Verification to Ship'}
                    </Button>
                </div>

            </div>
        </div>
    )
}
