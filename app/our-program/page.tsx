import React from 'react'
import OurProgram from '../components/home/OurProgram'



import program from '@/app/data/programs.json'
import { FaqSection } from '../components/home/Faqsection'
import MainContainer from '../components/ui/MainContainer'


function OurProgramPage() {
  return (
    <div className='bg-[#f4f4f4]'>
      <OurProgram
        eyebrow={program.hero.label}
        heading={program.hero.title ?? ""}
        program={program.programsOverview.programs ?? []}
        isShowMoreButton={false} />

      <div className='mt-10'>
        <MainContainer>
          <div className='w-full border-t border-[#252d4a]/20' />
        </MainContainer>
        <FaqSection />
      </div>
    </div>
  )
}

export default OurProgramPage
