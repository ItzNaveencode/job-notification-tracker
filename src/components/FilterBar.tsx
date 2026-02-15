import type { ComponentProps } from 'react'
import { Card } from './Card'
import { Input } from './Input'
import { SPACING } from '../design-system/tokens/spacing'
import { COLORS } from '../design-system/tokens/colors'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { RADIUS } from '../design-system/tokens/radius'

interface FilterState {
    keyword: string
    location: string
    mode: string
    experience: string
    source: string
    sort: string
}

interface FilterBarProps {
    filters: FilterState
    onFilterChange: (filters: FilterState) => void
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
    const handleChange = (key: keyof FilterState, value: string) => {
        onFilterChange({ ...filters, [key]: value })
    }

    const selectStyle: ComponentProps<'select'>['style'] = {
        padding: SPACING.sm,
        borderRadius: RADIUS.Default,
        border: `1px solid ${COLORS.PrimaryText}20`,
        backgroundColor: 'transparent',
        fontFamily: TYPOGRAPHY.FontFamily.Base,
        fontSize: TYPOGRAPHY.Size.Body,
        color: COLORS.PrimaryText,
        outline: 'none',
        cursor: 'pointer',
        minWidth: '140px'
    }

    return (
        <Card style={{ marginBottom: SPACING.lg, padding: SPACING.md }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.md }}>
                {/* Row 1: Search */}
                <div style={{ display: 'flex', gap: SPACING.md }}>
                    <Input
                        placeholder="Search by role or company..."
                        value={filters.keyword}
                        onChange={(e) => handleChange('keyword', e.target.value)}
                    />
                </div>

                {/* Row 2: Dropdowns */}
                <div style={{ display: 'flex', gap: SPACING.md, flexWrap: 'wrap' }}>
                    <select
                        style={selectStyle}
                        value={filters.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                    >
                        <option value="">All Locations</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Noida">Noida</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Remote">Remote</option>
                    </select>

                    <select
                        style={selectStyle}
                        value={filters.mode}
                        onChange={(e) => handleChange('mode', e.target.value)}
                    >
                        <option value="">All Modes</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Onsite">Onsite</option>
                    </select>

                    <select
                        style={selectStyle}
                        value={filters.experience}
                        onChange={(e) => handleChange('experience', e.target.value)}
                    >
                        <option value="">Any Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1 years">0-1 years</option>
                        <option value="0-2 years">0-2 years</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="2-5 years">2-5 years</option>
                    </select>

                    <select
                        style={selectStyle}
                        value={filters.source}
                        onChange={(e) => handleChange('source', e.target.value)}
                    >
                        <option value="">All Sources</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Naukri">Naukri</option>
                        <option value="Wellfound">Wellfound</option>
                        <option value="Fuel">Fuel</option>
                        <option value="Instahyre">Instahyre</option>
                    </select>

                    <select
                        style={{ ...selectStyle, marginLeft: 'auto' }}
                        value={filters.sort}
                        onChange={(e) => handleChange('sort', e.target.value)}
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
        </Card>
    )
}
