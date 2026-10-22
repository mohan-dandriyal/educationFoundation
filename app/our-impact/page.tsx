
import React from 'react'
import HeroSection from '../components/Ourimpact/HeroSection'
import ImpactStatisticsSection, { type ImpactContent } from '../components/Ourimpact/ImpactStatistics'
import FutureGoalsSection, { type GoalsContent } from '../components/Ourimpact/Futuregoalssection'
import FinalCtaSection, { type CtaContent } from '../components/Ourimpact/Finalctasection'

import ourImpact from '@/app/data/ourImpact.json'

function OurImpact() {
    return (
        <div>

            <div>
                <HeroSection
                    title={ourImpact?.hero?.title ?? ""}
                    description={ourImpact?.hero?.description ?? ""}
                    mainImag={ourImpact?.hero?.image ?? {}}
                    button={ourImpact?.hero?.buttons ?? {}}
                />
            </div>

            <ImpactStatisticsSection
                content={ourImpact.impactStatistics as ImpactContent}
            />
            <FutureGoalsSection
                content={ourImpact.ourFutureGoals as GoalsContent}
            />
            <FinalCtaSection
                content={ourImpact.finalCallToAction as CtaContent}
            />
        </div>
    )
}

export default OurImpact
