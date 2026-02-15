import { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { SPACING } from '../design-system/tokens/spacing'
import { COLORS } from '../design-system/tokens/colors'
import { RADIUS } from '../design-system/tokens/radius'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import {
    CHECKLIST_STORAGE_KEY,
    CHECKLIST_ITEMS
} from '../lib/checklist'
import type { ChecklistState } from '../lib/checklist'

export function ShipPage() {
    const [passedCount, setPassedCount] = useState(0)
    const [status, setStatus] = useState<'loading' | 'locked' | 'passed'>('loading')

    useEffect(() => {
        try {
            const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY)
            if (!raw) {
                setStatus('locked')
                return
            }
            const data: ChecklistState = JSON.parse(raw)
            const count = Object.values(data).filter(Boolean).length
            setPassedCount(count)
            setStatus(count === CHECKLIST_ITEMS.length ? 'passed' : 'locked')
        } catch (e) {
            console.error('Ship Gate Error', e)
            setStatus('locked')
        }
    }, [])

    if (status === 'loading') return null

    if (status === 'locked') {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.Background,
                padding: SPACING.xl
            }}>
                <div style={{ fontSize: '64px', marginBottom: SPACING.lg }}>🔒</div>
                <h1 style={{ fontFamily: TYPOGRAPHY.FontFamily.Serif, fontSize: '32px', marginBottom: SPACING.md }}>
                    Shipping Locked
                </h1>
                <p style={{ opacity: 0.7, marginBottom: SPACING.xl, fontSize: '18px' }}>
                    Complete all verification steps before proceeding.
                </p>
                <div style={{
                    padding: SPACING.lg,
                    backgroundColor: COLORS.White,
                    borderRadius: RADIUS.Default,
                    border: '1px solid #D9534F30',
                    color: '#D9534F',
                    fontWeight: 600,
                    marginBottom: SPACING.xl
                }}>
                    Tests Passed: {passedCount} / {CHECKLIST_ITEMS.length}
                </div>
                <Button onClick={() => window.location.href = '/jt/07-test'}>
                    Return to Verification
                </Button>
            </div>
        )
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2ECC7110', // Slight green tint
            padding: SPACING.xl
        }}>
            <div style={{ fontSize: '64px', marginBottom: SPACING.lg }}>🚀</div>
            <h1 style={{ fontFamily: TYPOGRAPHY.FontFamily.Serif, fontSize: '48px', marginBottom: SPACING.md, color: '#27AE60' }}>
                Ready to Ship
            </h1>
            <p style={{ opacity: 0.8, marginBottom: SPACING.xl, fontSize: '20px', maxWidth: '600px', textAlign: 'center' }}>
                All systems verified. You are clear for launch.
            </p>
            <div style={{
                padding: SPACING.lg,
                backgroundColor: '#FFFFFF',
                borderRadius: RADIUS.Default,
                border: '1px solid #2ECC7150',
                color: '#27AE60',
                fontWeight: 700,
                fontSize: '24px',
                marginBottom: SPACING.xl
            }}>
                10 / 10 Verified
            </div>

            <div style={{ display: 'flex', gap: SPACING.md }}>
                <Button variant="secondary" onClick={() => window.location.href = '/dashboard'}>
                    Back to Dashboard
                </Button>
                <Button onClick={() => alert('Shipping Sequence Initiated... (Simulation)')}>
                    Initiate Ship Sequence
                </Button>
            </div>
        </div>
    )
}
