
import React from 'react'
import BlogSection from '../components/blog/BlogSection'

import blog from '@/app/data/blog.json'

function page() {
  return (
    <div>
         <BlogSection
                //   eyebrow={home.ourBlog.eyebrow ?? ""}
                //   heading={home.ourBlog.heading ?? ""}
                  post={blog.post ?? []} />
    </div>
  )
}

export default page