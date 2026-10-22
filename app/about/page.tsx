
import React from 'react'
import { FaqSection } from '../components/home/Faqsection'
import { AboutSplitSection } from '../components/about/Aboutsplitsection'
import { OurMissionSection } from '../components/about/OurMission'
import { OurJourneySection } from '../components/about/JourneySection'
import { OurTeamSection } from '../components/about/Ourteamsection'
import about from '@/app/data/about.json'

function AboutPage() {
  return (
    <div>

        <div>
            <AboutSplitSection
              {...about.aboutSplit}
              thumbs={about.aboutSplit.thumbs as [{ src: string; alt: string }, { src: string; alt: string }]}
            />
        </div>

        <div>
            <OurMissionSection {...about.mission} />
        </div>

         <div className=''>
            <OurJourneySection {...about.journey} />
        </div>

         <div>
            <OurTeamSection {...about.team} />
        </div>

        <FaqSection {...about.faq} />
    </div>
  )
}

export default AboutPage
