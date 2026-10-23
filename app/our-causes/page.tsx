import React from 'react'
import OurCausesSection from '../components/home/Ourcausessection'

import cause from '@/app/data/cause.json'
import { Breadcrumb } from '../components/Breadcrumb'

function page() {
  return (
    <div>
      
      <div>
           <div className="py-20 bg-[#fdfbf3]">
             <div className='flex justify-center mb-7'>
                    <Breadcrumb items={cause.breadcrum} />
                  </div>

                <OurCausesSection
                  currencySymbol=""
                  content={{ ...cause.ourCauses, causes: cause.ourCauses.causes }}
                />
              </div>
      </div>
    </div>
  )
}

export default page