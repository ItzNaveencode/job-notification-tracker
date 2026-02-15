import { useState } from 'react'
import { COLORS } from '../design-system/tokens/colors'
import { SPACING } from '../design-system/tokens/spacing'
import { RADIUS } from '../design-system/tokens/radius'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { MOTION } from '../design-system/tokens/motion'

interface ProofItemProps {
    label: string
}

function ProofItem({ label }: ProofItemProps) {
    const [isChecked, setIsChecked] = useState(false)
    const [proof, setProof] = useState('')

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.xs,
            padding: SPACING.xs,
            borderRadius: RADIUS.Default,
            backgroundColor: isChecked ? `${COLORS.Accent}10` : 'transparent',
            transition: `all ${MOTION.Duration.Fast} ${MOTION.Timing.Default}`,
        }}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                style={{
                    width: SPACING.sm,
                    height: SPACING.sm,
                    accentColor: COLORS.Accent,
                    cursor: 'pointer',
                }}
            />
            <span style={{
                fontSize: TYPOGRAPHY.Size.Caption,
                fontWeight: isChecked ? 600 : 400,
                color: isChecked ? COLORS.Accent : COLORS.PrimaryText,
            }}>
                {label}
            </span>
            {isChecked && (
                <input
                    type="text"
                    placeholder="Proof URL/Note..."
                    value={proof}
                    onChange={(e) => setProof(e.target.value)}
                    style={{
                        marginLeft: SPACING.xs,
                        padding: SPACING.xs,
                        border: 'none',
                        borderBottom: `1px solid ${COLORS.Accent}`,
                        background: 'transparent',
                        fontSize: TYPOGRAPHY.Size.Caption,
                        color: COLORS.Accent,
                        outline: 'none',
                        fontFamily: TYPOGRAPHY.FontFamily.Base,
                    }}
                />
            )}
        </div>
    )
}

export function ProofFooter() {
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: SPACING.xl,
            backgroundColor: '#FFFFFF',
            borderTop: `1px solid ${COLORS.PrimaryText}10`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: SPACING.lg,
            zIndex: 1000,
        }}>
            <div style={{
                display: 'flex',
                gap: SPACING.lg,
            }}>
                <ProofItem label="UI Built" />
                <ProofItem label="Logic Working" />
                <ProofItem label="Test Passed" />
                <ProofItem label="Deployed" />
            </div>
        </div>
    )
}
