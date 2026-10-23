
import OurProgram from '../components/home/OurProgram'



import program from '@/app/data/programs.json'
import { Breadcrumb } from '../components/Breadcrumb'

function OurProgramPage() {
  return (
    <div className='bg-[#f4f4f4] pb-20'>

      <div className='flex justify-center pt-20 mb-7'>
        <Breadcrumb items={program.hero.breadcrum} />
      </div>

      <OurProgram
        eyebrow={program.hero.label}
        heading={program.hero.title ?? ""}
        program={program.programsOverview.programs ?? []}
        isShowMoreButton={false} />

      
    </div>
  )
}

export default OurProgramPage
