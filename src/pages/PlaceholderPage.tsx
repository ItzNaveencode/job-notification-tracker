import { ContextHeader } from '../layout/ContextHeader'
import { TwoColumnLayout } from '../layout/TwoColumnLayout'

interface PlaceholderPageProps {
    title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
    return (
        <>
            <ContextHeader
                title={title}
                description="This section will be built in the next step."
            />

            <TwoColumnLayout
                leftContent={
                    <div style={{ opacity: 0.5 }}>
                        {/* Empty space or a simple placeholder graphic could go here */}
                        {/* The request says: A muted subtext: "This section will be built in the next step." 
                The subtext is handled by ContextHeader description.
                Layout should be consistent with the app structure.
            */}
                        Content Area
                    </div>
                }
                rightContent={
                    <div style={{ opacity: 0.5 }}>
                        Side Panel
                    </div>
                }
            />
        </>
    )
}
