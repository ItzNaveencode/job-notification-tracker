import { Link } from 'react-router-dom'
import { ContextHeader } from '../layout/ContextHeader'
import { TwoColumnLayout } from '../layout/TwoColumnLayout'
import { COLORS } from '../design-system/tokens/colors'
import { TYPOGRAPHY } from '../design-system/tokens/typography'
import { Button } from '../components/Button'

export function NotFoundPage() {
    return (
        <>
            <ContextHeader
                title="Page Not Found"
                description="The page you differ looking for does not exist."
            />

            <TwoColumnLayout
                leftContent={
                    <div style={{
                        fontFamily: TYPOGRAPHY.FontFamily.Base,
                        color: COLORS.PrimaryText,
                        opacity: 0.8
                    }}>
                        <p style={{ marginBottom: '24px' }}>
                            We couldn't find the page you're looking for. Please check the URL or go back to the dashboard.
                        </p>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                            <Button>Go to Dashboard</Button>
                        </Link>
                    </div>
                }
            />
        </>
    )
}
