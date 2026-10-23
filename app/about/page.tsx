
import React from 'react'
import { AboutSplitSection } from '../components/about/Aboutsplitsection'
import { OurMissionSection } from '../components/about/OurMission'
import { OurJourneySection } from '../components/about/JourneySection'
import about from '@/app/data/about.json'
import { OurVision } from '../components/about/Ourvision'

function AboutPage() {
  return (
    <div>

        <div>
            <AboutSplitSection
              {...about.aboutSplit}
              thumbs={about.aboutSplit.thumbs as [{ src: string; alt: string }, { src: string; alt: string }]}
              breadCrumb ={ about.breadcrum}
           />
        </div>

        <div>
            <OurMissionSection {...about.mission} />
        </div>

        <div>
          <OurVision content={about.ourVision} />
        </div>

         <div className=''>
            <OurJourneySection {...about.journey} />
        </div>
    </div>
  )
}

export default AboutPage
